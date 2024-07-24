const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("jwtCookie");
  if (!token) return res.sendStatus(401);
  const account = jwt.verify(token, process.env.JWT_SECRET);

  if (!Object.values(account.roles).includes("ROLE_ADMIN")) {
    return res.sendStatus(401);
  }

  req.account = account;

  next();
};