const { Router } = require("express");
const { sequelize, DataTypes } = require("../db");
const Manufacturer = require("../models/manufacturer")(sequelize, DataTypes);
const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");

const router = new Router();

router.get("", async (req, res, next) => {
  const manufacturers = await Manufacturer.findAll({
    where: req.query,
  });
  res.json(manufacturers);
});

router.post("", checkAuthAdmin, async (req, res, next) => {
  try {
    const manufacturer = await Manufacturer.create(req.body);
    res.status(201).json(manufacturer);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const manufacturer = await Manufacturer.findByPk(parseInt(req.params.id));
    if (manufacturer) {
      res.json(manufacturer);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, manufacturers] = await Manufacturer.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (manufacturers[0]) {
      res.json(manufacturers[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const nbDeleted = await Manufacturer.destroy({
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
    const nbDeleted = await Manufacturer.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const manufacturer = await Manufacturer.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(manufacturer);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
