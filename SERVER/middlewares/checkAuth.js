const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("jwtCookie");
  if (!token) return res.sendStatus(401);
  const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded_token) {
    return res.sendStatus(401);
  }

  req.account = decoded_token;

  next();
};