const { Router } = require("express");
const Order_product = require("../models/orderproduct");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", async (req, res, next) => {
  const ordersProduct = await Order_product.findAll({
    where: req.query,
  });
  res.json(ordersProduct);
});

router.post("/", async (req, res, next) => {
  try {
    const orderProduct = await Order_product.create(req.body);
    res.status(201).json(orderProduct);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orderProduct = await Order_product.findByPk(parseInt(req.params.id));
    if (orderProduct) {
      res.json(orderProduct);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, ordersProduct] = await Order_product.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (ordersProduct[0]) {
      res.json(ordersProduct[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Order_product.destroy({
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
    const nbDeleted = await Order_product.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const orderProduct = await Order_product.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(orderProduct);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
