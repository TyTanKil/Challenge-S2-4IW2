const { Router } = require("express");
const CartProduct = require("../models/cartproduct");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const cartsProduct = await CartProduct.findAll({
    where: req.query,
  });
  res.json(cartsProduct);
});

router.post("/", async (req, res, next) => {
  try {
    const cartProduct = await CartProduct.create(req.body);
    res.status(201).json(cartProduct);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cartProduct = await CartProduct.findByPk(parseInt(req.params.id));
    if (cartProduct) {
      res.json(cartProduct);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, cartsProduct] = await CartProduct.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (cartsProduct[0]) {
      res.json(cartsProduct[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await CartProduct.destroy({
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
    const nbDeleted = await CartProduct.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const cartProduct = await CartProduct.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(cartProduct);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
