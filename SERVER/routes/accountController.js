const { Router } = require("express");
const Account = require("../models/account");
const checkAuth = require("../middlewares/checkAuth");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { v4: uuidv4, validate: isUUID } = require("uuid");
const accountConfirmationTemplate = require("../templates-mail/account-confirmation");
const accountChangeDataTemplate = require("../templates-mail/account-change-data");
const { sendEmail } = require("../mailer");
const bcrypt = require("bcryptjs");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");
const moment = require('moment');

const router = new Router();

router.get("/", checkAuthAdmin, async (req, res, next) => {
  try {
    const accounts = await Account.findAll({
      where: req.query,
    });
    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    if(req.body.birth_date && moment(req.body.birth_date).isAfter(moment().subtract(18, "years"))){
      res.sendStatus(400);
    }

    req.body.login =
      `${req.body.firstName[0]}${req.body.lastName}`.toLowerCase();
    const nbExisting = await Account.count({
      where: {
        login: {
          [Op.like]: `${req.body.login}%`,
        },
      },
    });
    if (nbExisting > 0) {
      req.body.login += nbExisting + 1;
    }

    const validate_hash = uuidv4();

    const account = await Account.create({
      id: uuidv4(),
      status: "c",
      roles: sequelize.literal(`ARRAY['ROLE_USER']::"enum_account_roles"[]`),
      validate_hash: validate_hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      birth_date: req.body.birth_date,
      newsletter: req.body.newsletter,
      phone: req.body.phone,
      login: req.body.login,
    });

    const mailOptions = accountConfirmationTemplate({
      to: req.body.email,
      name: `${req.body.firstName} ${req.body.lastName}`,
      valid_link: `${process.env.FRONT_URL}/validate/${validate_hash}`,
    });

    await sendEmail(mailOptions);
    res.sendStatus(201);
  } catch (e) {
    console.error("Error creating account:", e);
    if (e.errors && e.errors[0] && e.errors[0].type === "unique violation") {
      return res.status(409).json({ field: e.errors[0].path });
    }
    res.status(400).json(e);
  }
});

router.post("/verify-password", checkAuth, async (req, res) => {
  const password = req.body.password;
  try {
    const account = await Account.findOne({
      where: { id: req.account.id },
    });

    if (account && bcrypt.compareSync(password, account.password)) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du mot de passe:", error);
    res.status(500).send("Erreur serveur");
  }
});

router.get('/me', checkAuth, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.account.id },
    });
    res.json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ error: "Failed to fetch account" });
  } 
});

router.patch("/", checkAuth, async (req, res, next) => {
  try {
    if(req.body.birth_date && moment(req.body.birth_date).isAfter(moment().subtract(18, "years"))){
      res.sendStatus(400);
    }

    const existingAccount = req.account;

    if (!existingAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    const updatedFields = Object.keys(req.body);

    delete req.body.id;
    delete req.body.status;
    delete req.body.roles;
    delete req.body.validate_hash;

    const [nbUpdated, accounts] = await Account.update(req.body, {
      where: {
        id: existingAccount.id,
      },
      returning: true,
      individualHooks: true,
    });

    if (accounts[0]) {
      const modifiedFields = updatedFields.join(", ");
      const mailOptions = accountChangeDataTemplate({
        to: accounts[0].email,
        name: accounts[0].firstName,
        modifiedFields: modifiedFields,
      });

      if (accounts[0].notification) {
        await sendEmail(mailOptions);
      }
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error("Error updating account:", e);
    next(e);
  }
});

router.delete("/", checkAuth, async (req, res, next) => {
  try {
    const accountId = req.account.id;

    new_pwd = await bcrypt.hash("deleted", await bcrypt.genSalt(10));
    await Account.update(
      {
        firstName: "Anonymous",
        lastName: "User",
        email: `deleted-${accountId}@example.com`,
        phone: null,
        login: `deleted-${accountId}`,
        password: new_pwd,
        birth_date: null,
        roles: sequelize.literal(`ARRAY[]::"enum_account_roles"[]`),
        status: "d",
        notification: false,
        validate_hash: null,
      },
      {
        where: { id: accountId },
      }
    );

    res.json({ message: "Account anonymized successfully" });
  } catch (e) {
    console.error("Error deleting account:", e);
    next(e);
  }
});

//ROUTE ADMIN pour récupérer les infos d'un user
router.get("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const accountId = req.params.id.trim();
    if (!isUUID(accountId)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    const account = await Account.findOne({
      where: { id: accountId },
    });

    if (account) {
      res.json(account);
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  } catch (e) {
    console.error("Error finding account by ID:", e);
    next(e);
  }
});

//ROUTE ADMIN pour pas afficher les users supprimer en anonymous
router.get("/show/alluser", checkAuthAdmin, async (req, res, next) => {
  try {
    const users = await Account.findAll({
      where: {
        status: "a",
      },
      attributes: { exclude: ["password"] }, // Optionnel, pour exclure le mot de passe des résultats
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
});

//route admin
router.patch("/edit/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    if(req.body.birth_date && moment(req.body.birth_date).isAfter(moment().subtract(18, "years"))){
      res.sendStatus(400);
    }

    const accountId = req.params.id.trim();
    const existingAccount = await Account.findOne({ where: { id: accountId } });

    if (!existingAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (req.body.roles && typeof req.body.roles === "string") {
      req.body.roles = req.body.roles.split(",").map((role) => role.trim());
    }
    const [nbUpdated, accounts] = await Account.update(req.body, {
      where: {
        id: accountId,
      },
      returning: true,
      individualHooks: true,
    });

    // if (accounts[0]) {
    //   // Envoyer un email avec les champs modifiés
    //   const modifiedFields = updatedFields.join(", ");
    //   const mailOptions = accountChangeDataTemplate({
    //     to: accounts[0].email,
    //     name: accounts[0].firstName,
    //     modifiedFields: modifiedFields,
    //   });

    //   await sendEmail(mailOptions);
    res.sendStatus(201);
    // } else {
    //   res.sendStatus(404);
    // }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", checkAuth, async (req, res, next) => {
  try {
    const accountId = req.params.id.trim();
    if (!isUUID(accountId)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    const nbDeleted = await Account.update(
      {
        firstName: "Anonymous",
        lastName: "User",
        email: `deleted-${accountId}@example.com`,
        phone: null,
        login: `deleted-${accountId}`,
        password: null,
        status: "d",
        validate_hash: null,
      },
      {
        where: { id: accountId },
      }
    );

    const account = await Account.create({
      ...req.body,
      id: accountId,
    });

    res.status(nbDeleted ? 200 : 201).json(account);
  } catch (e) {
    console.error("Error replacing account:", e);
    next(e);
  }
});

// route admin
router.delete("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const accountId = req.params.id.trim();
    if (!isUUID(accountId)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    const account = await Account.findOne({ where: { id: accountId } });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    new_pwd = await bcrypt.hash("deleted", await bcrypt.genSalt(10));
    await Account.update(
      {
        firstName: "Anonymous",
        lastName: "User",
        email: `deleted-${accountId}@example.com`,
        phone: null,
        login: `deleted-${accountId}`,
        password: new_pwd,
        birth_date: null,
        roles: sequelize.literal(`ARRAY[]::"enum_account_roles"[]`),
        status: "d",
        notification: false,
        validate_hash: null,
      },
      {
        where: { id: accountId },
      }
    );

    res.json({ message: "Account anonymized successfully" });
  } catch (e) {
    console.error("Error deleting account:", e);
    next(e);
  }
});

module.exports = router;
