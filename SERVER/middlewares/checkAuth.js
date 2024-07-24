// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   // const token = localStorage.getItem("jwtToken");
//   const token = req.signedCookies.JWT;
//   if (!token) return res.sendStatus(401);
//   const account = jwt.verify(token, process.env.JWT_SECRET);
//   if (!account) {
//     res.clearCookie("JWT");
//     return res.sendStatus(401);
//   }

//   req.account = account;

//   next();
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Récupérer le jeton de l'en-tête Authorization
  let token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // Si aucun jeton dans l'en-tête, vérifier les cookies signés
  if (!token) {
    token = req.signedCookies.JWT;
  }

  console.log("Token:", token); // Log le jeton reçu

  if (!token) return res.sendStatus(401);

  try {
    const account = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Account:", account); // Log le compte décodé

    if (!account) {
      res.clearCookie("JWT");
      return res.sendStatus(401);
    }

    req.account = account;
    next();
  } catch (err) {
    res.clearCookie("JWT");
    console.error("JWT verification error:", err); // Log les erreurs de vérification

    return res.sendStatus(401);
  }
};
