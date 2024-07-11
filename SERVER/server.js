const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendEmail } = require("./mailer");
const app = express();
const AccountRouter = require("./routes/accountController");
const SecurityRouter = require("./routes/securityController");

// Import email templates
const confirmationTemplate = require("./templates-mail/confirmation");
const resetPasswordTemplate = require("./templates-mail/reset-password");
const shippingNotificationTemplate = require("./templates-mail/shipping-notification");
const birthdayTemplate = require("./templates-mail/birthday");
const accountConfirmationTemplate = require("./templates-mail/account-confirmation");
const abandonedCartTemplate = require("./templates-mail/abandoned-cart");
const paymentConfirmationTemplate = require("./templates-mail/payment-confirmation");
const newProductTemplate = require("./templates-mail/new-product");
const restockTemplate = require("./templates-mail/restock");
const priceChangeTemplate = require("./templates-mail/price-change");
const newsletterSignupTemplate = require("./templates-mail/newsletter-signup");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());
app.use(bodyParser.json());

// Endpoint pour envoyer des emails
app.post("/send-email", async (req, res) => {
  const { type, to, data } = req.body;

  let mailOptions;

  switch (type) {
    case "confirmation":
      mailOptions = confirmationTemplate({ to, ...data });
      break;
    case "reset-password":
      mailOptions = resetPasswordTemplate({ to, ...data });
      break;
    case "shipping-notification":
      mailOptions = shippingNotificationTemplate({ to, ...data });
      break;
    case "birthday":
      mailOptions = birthdayTemplate({ to, ...data });
      break;
    case "account-confirmation":
      mailOptions = accountConfirmationTemplate({ to, ...data });
      break;
    case "abandoned-cart":
      mailOptions = abandonedCartTemplate({ to, ...data });
      break;
    case "payment-confirmation":
      mailOptions = paymentConfirmationTemplate({ to, ...data });
      break;
    case "new-product":
      mailOptions = newProductTemplate({ to, ...data });
      break;
    case "restock":
      mailOptions = restockTemplate({ to, ...data });
      break;
    case "price-change":
      mailOptions = priceChangeTemplate({ to, ...data });
      break;
    case "newsletter-signup":
      mailOptions = newsletterSignupTemplate({ to, ...data });
      break;
    default:
      return res.status(400).json({ error: "Type de mail non reconnu" });
  }

  try {
    await sendEmail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({
      error: "Erreur lors de l'envoi de l'email",
      details: error.message,
    });
  }
});

//Middleware pour gérer les erreurs 502
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error("Erreur serveur:", err);
  res.status(502).redirect("/server-error");
});

app.use("/users", AccountRouter);
app.use(SecurityRouter);

app.get("/", (req, res, next) => {
  res.send("Coucou " + JSON.stringify(req.query));
});

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});

// Middleware pour gérer les erreurs 404 (doit être ajouté après toutes les routes)
app.use((req, res) => {
  res.status(404).send("Page not found");
});
