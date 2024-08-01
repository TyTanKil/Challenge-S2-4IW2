const { Router } = require("express");
const Promotion = require("../models/promotion");
const checkAuth = require("../middlewares/checkAuth");
const sequelize = require("sequelize");
const { v4: uuidv4, validate: isUUID } = require("uuid");
const moment = require('moment');

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.findAll({
      where: req.query,
    });
    res.json(promotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    res.status(500).json({ error: "Failed to fetch promotions" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { code, discount, category, product, manufacturer, startDate, endDate } = req.body;
    const newPromotion = await Promotion.create({
      code,
      discount,
      category,
      product,
      manufacturer,
      startDate,
      endDate,
    });
    res.status(201).json(newPromotion);
  } catch (error) {
    console.error("Error creating promotion:", error);
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const promotionId = req.params.id.trim();
    if (!isUUID(promotionId)) {
      return res.status(400).json({ error: "Invalid promotion ID" });
    }

    const promotion = await Promotion.findOne({
      where: { id: promotionId },
    });

    if (promotion) {
      res.json(promotion);
    } else {
      res.status(404).json({ error: "Promotion not found" });
    }
  } catch (error) {
    console.error("Error fetching promotion:", error);
    res.status(500).json({ error: "Failed to fetch promotion" });
  }
});

router.patch("/:id", checkAuth, async (req, res) => {
  try {
    const promotionId = req.params.id.trim();
    if (!isUUID(promotionId)) {
      return res.status(400).json({ error: "Invalid promotion ID" });
    }

    const existingPromotion = await Promotion.findOne({ where: { id: promotionId } });

    if (!existingPromotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    const [nbUpdated, promotions] = await Promotion.update(req.body, {
      where: { id: promotionId },
      returning: true,
      individualHooks: true,
    });

    if (promotions[0]) {
      res.json(promotions[0]);
    } else {
      res.status(404).json({ error: "Failed to update promotion" });
    }
  } catch (error) {
    console.error("Error updating promotion:", error);
    res.status(400).json(error);
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const promotionId = req.params.id.trim();
    if (!promotionId) {
      return res.status(400).json({ error: "Invalid promotion ID" });
    }

    const promotion = await Promotion.findOne({ where: { id: promotionId } });

    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    await promotion.destroy();
    res.json({ message: "Promotion deleted successfully" });
  } catch (error) {
    console.error("Error deleting promotion:", error);
    res.status(500).json({ error: "Failed to delete promotion" });
  }
});

module.exports = router;
