const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.signedCookies.JWT;
  console.log(token);
  if (!token) return res.sendStatus(401);
  const account = jwt.verify(token, process.env.JWT_SECRET);
  console.log(account);
  if (!account) {
    res.clearCookie("JWT");
    return res.sendStatus(401);
  }

  req.account = account;

  next();
};
