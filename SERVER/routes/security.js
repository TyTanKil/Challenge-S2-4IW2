const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const {Op} = require("sequelize");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const account = await Account.findOne({
    where: {
      [Op.or]: [{ email: req.body.login }, { login: req.body.login }],
    },
  });
  if (!account) return res.sendStatus(401);
  if (!(await bcrypt.compare(req.body.password, account.password))) {
    return res.sendStatus(401);
  }

  const token = jwt.sign(
    {
      id: account.id,
      role: account.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30 days",
      algorithm: "HS256",
    }
  );

  res.cookie("JWT", token, {
    httpOnly: true,
    signed: true,
  });

  res.json(account);
});

module.exports = router;
