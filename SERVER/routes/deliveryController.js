const express = require("express");
const {
  createDelivery,
  getDelivery,
} = require("../services/denormalizations/deliveryService");

const db = require("../db");
const { DeliveryStatus } = db;


const router = express.Router();

// Route pour créer une nouvelle livraison
router.post("/delivery", (req, res) => {
  console.log("POST /delivery called with body:", req.body);

  const { id } = req.body;
  const delivery = createDelivery(id);
  res.status(201).json(delivery);
});

// Route pour récupérer une livraison par ID
router.get("/:id", async (req, res) => {
  try {
    const deliveries = await DeliveryStatus.findAll({
      where: { id_order: req.params.id },
      order: [['date', 'ASC']], // ou DESC si tu veux le plus récent en premier
      attributes: ["status", "date"],
    });

    if (!deliveries.length) {
      return res.status(404).json({ error: "No delivery status found" });
    }
    res.json(deliveries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
