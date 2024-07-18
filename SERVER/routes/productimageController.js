const { Router } = require("express");
const { sequelize, DataTypes } = require("../db");
const ProductImage = require("../models/productimage")(sequelize, DataTypes);
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", async (req, res, next) => {
  const productsImage = await ProductImage.findAll({
    where: req.query,
  });
  res.json(productsImage);
});

router.post("/", async (req, res, next) => {
  try {
    const productImage = await ProductImage.create(req.body);
    res.status(201).json(productImage);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const productImage = await ProductImage.findByPk(parseInt(req.params.id));
    if (productImage) {
      res.json(productImage);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, productsImage] = await ProductImage.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (productsImage[0]) {
      res.json(productsImage[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await ProductImage.destroy({
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
    const nbDeleted = await ProductImage.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const productImage = await ProductImage.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(productImage);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
