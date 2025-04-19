const express = require("express");
const {
  createDelivery,
  getDelivery,
} = require("../services/denormalizations/deliveryService");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("API is working!");
});

// Route pour créer une nouvelle livraison
router.post("/delivery", (req, res) => {
  console.log("POST /delivery called with body:", req.body);

  const { id } = req.body;
  const delivery = createDelivery(id);
  res.status(201).json(delivery);
});

// Route pour récupérer une livraison par ID
router.get("/delivery/:id", (req, res) => {
  console.log(`GET /delivery/${req.params.id} called`);

  const delivery = getDelivery(req.params.id);
  if (!delivery) {
    return res.status(404).json({ error: "Delivery not found" });
  }
  res.json(delivery);
});

module.exports = router;
