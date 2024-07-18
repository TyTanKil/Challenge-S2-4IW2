const { Router } = require("express");
const Account = require("../models/account");
const checkAuth = require("../middlewares/checkAuth");
const sequelize = require("sequelize");
const router = new Router();
const { Op } = require("sequelize");
const { v4: uuidv4, validate: isUUID } = require('uuid'); // Importez `validate` de `uuid`
const accountConfirmationTemplate = require("../templates-mail/account-confirmation");
const accountChangeDataTemplate = require("../templates-mail/account-change-data");
const { sendEmail } = require("../mailer");

router.get("/", checkAuth, async (req, res, next) => {
  const accounts = await Account.findAll({
    where: req.query,
  });
  res.json(accounts);
});

router.post("/", async (req, res, next) => {
  try {
    req.body.login = `${req.body.firstName[0]}${req.body.lastName}`.toLowerCase();
    const nbExisting = await Account.count({
      where: {
        login: {
          [Op.like]: `${req.body.login}%`
        }
      }
    });
    if (nbExisting > 0) {
      req.body.login += nbExisting + 1;
    }

    const validate_hash = uuidv4();

    const account = await Account.create({
      id: uuidv4(),
      ...req.body,
      status: 'c',
      roles: sequelize.literal(`ARRAY['ROLE_USER']::"enum_account_roles"[]`),
      validate_hash: validate_hash
    });

    const mailOptions = accountConfirmationTemplate({
      to: req.body.email,
      name: `${req.body.firstName} ${req.body.lastName}`,
      valid_link: `${process.env.FRONT_URL}/validate/${validate_hash}`
    });

    await sendEmail(mailOptions);
    res.sendStatus(201);
  } catch (e) {
    if (e.errors[0] && e.errors[0].type === "unique violation") {
      return res.status(409).json({ field: e.errors[0].path });
    }
    res.status(400).json(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const accountId = req.params.id.trim(); // Supprimez les espaces blancs
    if (!isUUID(accountId)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    const account = await Account.findOne({
      where: { id: accountId }
    });

    if (account) {
      res.json(account);
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  } catch (e) {
    console.error("Error in finding account by ID:", e); // Logging for debugging
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const accountId = req.params.id.trim();
    const existingAccount = await Account.findOne({ where: { id: accountId } });

    if (!existingAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    const updatedFields = Object.keys(req.body);

    const [nbUpdated, accounts] = await Account.update(req.body, {
      where: {
        id: accountId,
      },
      returning: true,
      individualHooks: true,
    });

    if (accounts[0]) {
      // Envoyer un email avec les champs modifiés
      const modifiedFields = updatedFields.join(", ");
      const mailOptions = accountChangeDataTemplate({
        to: accounts[0].email,
        name: accounts[0].firstName,
        modifiedFields: modifiedFields,
      });

      await sendEmail(mailOptions);
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Account.destroy({
      where: {
        id: req.params.id, // Assurez-vous que l'ID est traité comme une chaîne
      },
    });
    if (nbDeleted === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Account.destroy({
      where: {
        id: req.params.id, // Assurez-vous que l'ID est traité comme une chaîne
      },
    });
    const account = await Account.create({
      ...req.body,
      id: req.params.id, // Assurez-vous que l'ID est traité comme une chaîne
    });
    res.status(nbDeleted ? 200 : 201).json(account);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
