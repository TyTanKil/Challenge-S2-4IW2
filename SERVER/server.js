const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendEmail } = require("./mailer");
const app = express();
const AccountRouter = require("./routes/accountController");
const ProductRouter = require("./routes/productController");
const NewsletterRouter = require("./routes/newsletterController");
const CartRouter = require("./routes/cartController");
const CartProductRouter = require("./routes/cartproductController");
const StockRouter = require("./routes/stockController");
const SecurityRouter = require("./routes/securityController");
const PaymentRouter = require("./payment");
const path = require("path");

// Import email templates
const confirmationTemplate = require("./templates-mail/confirmation");
const accountChangeDataTemplate = require("./templates-mail/account-change-data");
const shippingNotificationTemplate = require("./templates-mail/shipping-notification");
const birthdayTemplate = require("./templates-mail/birthday");
const accountConfirmationTemplate = require("./templates-mail/account-confirmation");
const abandonedCartTemplate = require("./templates-mail/abandoned-cart");
const paymentConfirmationTemplate = require("./templates-mail/payment-confirmation");
const newProductTemplate = require("./templates-mail/new-product");
const restockTemplate = require("./templates-mail/restock");
const priceChangeTemplate = require("./templates-mail/price-change");
const contactSupportTemplate = require("./templates-mail/contact_support");

const productController = require("./routes/productController");
const categoryController = require("./routes/categoryController");
const manufacturerController = require("./routes/manufacturerController");
const uploadController = require("./routes/uploadController");
const stockController = require("./routes/stockController");
const productimageController = require("./routes/productimageController");
const orderController = require("./routes/orderController");
const orderProductController = require("./routes/orderproductController");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());
app.use(bodyParser.json());
app.use("/products", productController);
app.use("/category", categoryController);
app.use("/manufacturer", manufacturerController);
app.use("/stocks", stockController);
app.use("/productimage", productimageController);
app.use("/order", orderController);
app.use("/order-product", orderProductController);
app.use("/payment", PaymentRouter);
app.use("/stock", StockRouter);
// app.use("/upload", uploadController);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Utilisation des routes de paiement
app.use(PaymentRouter);

require("./middlewares/birthdayEmailScheduler");

// Endpoint pour envoyer des emails
app.post("/send-email", async (req, res) => {
  const { type, to, data } = req.body;

  let mailOptions;

  switch (type) {
    case "confirmation":
      mailOptions = confirmationTemplate({ to, ...data });
      break;
    case "account-change-data":
      mailOptions = accountChangeDataTemplate({ to, ...data });
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
    case "contact-support":
      mailOptions = contactSupportTemplate({ ...data });
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

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error("Erreur serveur:", err);
  res.status(502).redirect("/server-error");
});

app.use("/user", AccountRouter);
app.use("/cart", CartRouter);
app.use("/cartproduct", CartProductRouter);
app.use("/product", ProductRouter);
app.use("/newsletter", NewsletterRouter);
app.use(SecurityRouter);

app.get("/", (req, res, next) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});

// Middleware pour gérer les erreurs 404 (doit être ajouté après toutes les routes)
app.use((req, res) => {
  res.status(404).send("Page not found");
});
