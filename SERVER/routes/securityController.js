const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const { Op } = require("sequelize");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const account = await Account.findOne({
    where: {
      [Op.and]: [
        {
          [Op.or]: [{ email: req.body.login }, { login: req.body.login }],
        },
        {
          [Op.or]: [{ status: "a" }, { status: "c" }],
        },
      ],
    },
  });
  if (!account) return res.sendStatus(401);
  if (!(await bcrypt.compare(req.body.password, account.password))) {
    return res.sendStatus(401);
  }
  if (account.status === "c") {
    return res.sendStatus(409);
  }

  const token = jwt.sign(
    {
      id: account.id,
      name: account.lastName + " " + account.firstName,
      roles: account.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30 days",
      algorithm: "HS256",
    }
  );

  return res.json(token);
});

router.patch("/validate-account/:hash", async (req, res, next) => {
  try {
    const account = await Account.findOne({
      where: {
        validate_hash: req.params.hash,
      },
    });

    if (account) {
      account.validate_hash = null;
      account.status = "a";
      await account.save();
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
