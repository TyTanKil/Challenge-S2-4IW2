const { Router } = require("express");
const Newsletter = require("../models/newsletter");
const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");
const router = new Router();

router.get("/", checkAuthAdmin, async (req, res, next) => {
  const newsletter = await Newsletter.findAll();
  res.json(newsletter);
});

router.post("/", checkAuthAdmin, async (req, res, next) => {
  try {
    const userAddress = await Newsletter.create(req.body);
    res.status(201).json(userAddress);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const userAddress = await Newsletter.findByPk(parseInt(req.params.id));
    if (userAddress) {
      res.json(userAddress);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const [nbUpdated, usersAddress] = await Newsletter.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (usersAddress[0]) {
      res.json(usersAddress[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    const nbDeleted = await Newsletter.destroy({
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
    const nbDeleted = await Newsletter.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const userAddress = await Newsletter.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(userAddress);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
