const { Router } = require("express");
const { sequelize, DataTypes } = require("../db");
const Category = require("../models/category")(sequelize, DataTypes);
const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");

const router = new Router();

router.get("", async (req, res, next) => {
  const categories = await Category.findAll({
    where: req.query,
  });
  res.json(categories);
});

router.post("", checkAuthAdmin, async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(parseInt(req.params.id));
    if (category) {
      res.json(category);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const [nbUpdated, categories] = await Category.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (categories[0]) {
      res.json(categories[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const nbDeleted = await Category.destroy({
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

router.put("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const nbDeleted = await Category.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const category = await Category.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(category);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
