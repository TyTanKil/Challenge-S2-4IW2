const { Router } = require("express");
const Order = require("../models/order");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const orders = await Order.findAll({
    where: req.query,
  });
  res.json(orders);
});

router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(parseInt(req.params.id));
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, orders] = await Order.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (orders[0]) {
      res.json(orders[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Order.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (nbDeleted === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Order.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const order = await Order.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(order);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
