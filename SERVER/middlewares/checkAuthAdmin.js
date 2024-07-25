const Account = require("../models/account");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.get("jwtCookie");
  if (!token) return res.sendStatus(401);
  const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
  const account = await Account.findOne({
    where: {id: decoded_token.id},
  });

  if (!account || !Object.values(account.roles).includes("ROLE_ADMIN")) {
    return res.sendStatus(401);
  }

  req.account = decoded_token;

  next();
};