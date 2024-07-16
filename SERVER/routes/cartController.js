const { Router } = require("express");
const Cart = require("../models/cart");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const carts = await Cart.findAll({
    where: req.query,
  });
  res.json(carts);
});

router.post("/", async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(parseInt(req.params.id));
    if (cart) {
      res.json(cart);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, carts] = await Cart.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (carts[0]) {
      res.json(carts[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Cart.destroy({
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
    const nbDeleted = await Cart.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const cart = await Cart.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(cart);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
