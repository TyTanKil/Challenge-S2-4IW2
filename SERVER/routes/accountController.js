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

router.get("/", async (req, res, next) => {
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
    // Check if birth_date is valid and the user is at least 18 years old
    if (req.body.birth_date && moment(req.body.birth_date).isAfter(moment().subtract(18, "years"))) {
      return res.status(400).json({ error: "User must be at least 18 years old" });
    }

    // Generate the login
    req.body.login = `${req.body.firstName[0]}${req.body.lastName}`.toLowerCase();
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

    // Hash the anonymized data to check for existing anonymized accounts
    const anonymizedDataHash = await bcrypt.hash(
      `${req.body.firstName}${req.body.lastName}${req.body.email}`,
      await bcrypt.genSalt(10)
    );

    // Check for an existing anonymized account
    const anonymizedAccount = await Account.findOne({
      where: {
        anonymizedDataHash: anonymizedDataHash,
        status: "d",
      },
    });

    if (anonymizedAccount) {
      // Reactivate the anonymized account
      await Account.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          login: req.body.login,
          password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
          birth_date: req.body.birth_date,
          roles: sequelize.literal(`ARRAY['ROLE_USER']::"enum_account_roles"[]`),
          status: "c",
          notification: true,
          validate_hash: uuidv4(),
          anonymizedDataHash: null,
        },
        {
          where: { id: anonymizedAccount.id },
        }
      );

      return res.status(200).json({ message: "Account reactivated successfully" });
    } else {
      // Create a new account
      const validate_hash = uuidv4();
      delete req.body.roles;
      const account = await Account.create({
        id: uuidv4(),
        ...req.body,
        status: "c",
        roles: sequelize.literal(`ARRAY['ROLE_USER']::"enum_account_roles"[]`),
        validate_hash: validate_hash,
      });

      const mailOptions = accountConfirmationTemplate({
        to: req.body.email,
        name: `${req.body.firstName} ${req.body.lastName}`,
        valid_link: `${process.env.FRONT_URL}/validate/${validate_hash}`,
      });

      await sendEmail(mailOptions);
      return res.sendStatus(201);
    }
  } catch (e) {
    console.error("Error creating account:", e);
    if (e.errors && e.errors[0] && e.errors[0].type === "unique violation") {
      return res.status(409).json({ field: e.errors[0].path });
    }
    return res.status(400).json(e);
  }
});

router.post("/verify-password", async (req, res) => {
  const { accountId, password } = req.body;
  try {
    const account = await Account.findOne({
      where: { id: accountId },
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

router.get("/:id", async (req, res, next) => {
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

router.patch("/:id", checkAuth, async (req, res, next) => {
  try {
    if(req.body.birth_date && moment(req.body.birth_date).isAfter(moment().subtract(18, "years"))){
      res.sendStatus(400);
    }

    const accountId = req.params.id.trim();
    if (!isUUID(accountId)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    const existingAccount = await Account.findOne({ where: { id: accountId } });

    if (!existingAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    const updatedFields = Object.keys(req.body);

    delete req.body.roles;

    const [nbUpdated, accounts] = await Account.update(req.body, {
      where: {
        id: accountId,
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

router.delete("/:id", checkAuth, async (req, res, next) => {
  try {
    const accountId = req.params.id.trim();
    console.log(accountId);
    if (!isUUID(accountId)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    const account = await Account.findOne({ where: { id: accountId } });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const new_pwd = await bcrypt.hash("deleted", await bcrypt.genSalt(10));

    // Stocker les informations anonymisées
    const anonymizedDataHash = await bcrypt.hash(
      `${account.firstName}${account.lastName}${account.email}`,
      await bcrypt.genSalt(10)
    );

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
        anonymizedDataHash: anonymizedDataHash, // Stocker le hash des informations anonymisées
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

    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
