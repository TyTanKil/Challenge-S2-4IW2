const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const cors = require("cors");

const Promotion = require("./models/promotion");
// const Category = require("./models/category");
// const Product = require("./models/product");
// const Manufacturer = require("./models/manufacturer");
const Account = require("./models/account");

const stripe = new Stripe("sk_test_51Pb4ZxRplArNYE0A1twbt7PDqr1ADz0oSLM0vyOIEwmvCmNIkKUxddGRoBLwea805YkInglHBk4NZs4RZg6fNqJg00vZAYL70g", {
  apiVersion: "2022-11-15",
});

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

const BIRTHDAY_PROMO_CODE = "BIRTHDAY20";
const BIRTHDAY_DISCOUNT = 20;

router.post("/validate-promo-code", async (req, res) => {
  const { promoCode, accountId } = req.body;
  const currentDate = new Date();
  try {
    if (promoCode === BIRTHDAY_PROMO_CODE) {
      const account = await Account.findByPk(accountId);
      if (account) {
        console.log(account)
        const birthday = new Date(account.birth_date);
        const today = new Date();
        console.log("anniv" + birthday);
        console.log("Aujourdhui" + today);
        if (birthday.getMonth() === today.getMonth() && birthday.getDate() === today.getDate()) {
          return res.status(200).json({ valid: true, discount: BIRTHDAY_DISCOUNT });
        } else {
          return res.json({ valid: false, message: "Promotion is not valid today." });
        }
      } else {
        return res.json({ valid: false, message: "Account not found." });
      }
    } else {
      const promotion = await Promotion.findOne({ where: { code: promoCode } });
      if (promotion) {
        if (currentDate >= promotion.startDate && currentDate <= promotion.endDate) {
          return res.json({ valid: true, discount: promotion.discount });
        } else {
          return res.json({ valid: false, message: "Promotion is not valid at this time." });
        }
      } else {
        return res.json({ valid: false, message: "Promotion code not found." });
      }
    }
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({ error: 'Error validating promo code' });
  }
});

router.post("/create-checkout-session", async (req, res) => {
  const { lineItems, promoCode, accountId } = req.body;

  if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
    return res.status(400).json({ error: "Line items are empty or invalid" });
  }

  let discount = 0;

  if (promoCode) {
    if (promoCode === BIRTHDAY_PROMO_CODE) {
      const account = await Account.findByPk(accountId);
      if (account) {
        const birthday = new Date(account.birth_date);
        const today = new Date();
        if (birthday.getMonth() === today.getMonth() && birthday.getDate() === today.getDate()) {
          discount = BIRTHDAY_DISCOUNT;
        }
      }
    } else {
      const promotion = await Promotion.findOne({ where: { code: promoCode } });
      const currentDate = new Date();
      if (promotion && currentDate >= promotion.startDate && currentDate <= promotion.endDate) {
        discount = promotion.discount;
      }
    }
  }

  const discountedLineItems = lineItems.map(item => {
    const unitAmount = item.price_data.unit_amount;
    const discountedUnitAmount = Math.round(unitAmount * (1 - discount / 100));
    return {
      ...item,
      price_data: {
        ...item.price_data,
        unit_amount: discountedUnitAmount,
      }
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: discountedLineItems,
      mode: "payment",
      success_url: 'http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:8080/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
