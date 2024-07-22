// payment.js
const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const cors = require("cors");

const stripe = new Stripe(
  "sk_test_51Pb4ZxRplArNYE0A1twbt7PDqr1ADz0oSLM0vyOIEwmvCmNIkKUxddGRoBLwea805YkInglHBk4NZs4RZg6fNqJg00vZAYL70g",
  {
    apiVersion: "2022-11-15",
  }
);

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

let products = [
  { id: 1, name: "T-shirt", amount: 2000 },
  { id: 2, name: "Hat", amount: 1500 },
  { id: 3, name: "Shoes", amount: 5000 },
  { id: 4, name: "Jacket", amount: 8000 },
  { id: 5, name: "Pants", amount: 3000 },
];

let orders = [];

router.get("/products", (req, res) => {
  res.json(products);
});

router.post("/create-checkout-session", async (req, res) => {
  const { lineItems } = req.body;

  if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
    return res.status(400).json({ error: "Line items are empty or invalid" });
  }

  try {
    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:8080/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/orders/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const order = orders.find((o) => o.paymentIntentId === sessionId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

module.exports = router;
