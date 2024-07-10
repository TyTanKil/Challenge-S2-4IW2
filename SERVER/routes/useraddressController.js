const { Router } = require("express");
const UserAddress = require("../models/useraddress");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const usersAddress = await UserAddress.findAll({
    where: req.query,
  });
  res.json(usersAddress);
});

router.post("/", async (req, res, next) => {
  try {
    const userAddress = await UserAddress.create(req.body);
    res.status(201).json(userAddress);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userAddress = await UserAddress.findByPk(parseInt(req.params.id));
    if (userAddress) {
      res.json(userAddress);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, usersAddress] = await UserAddress.update(req.body, {
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

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await UserAddress.destroy({
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
    const nbDeleted = await UserAddress.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const userAddress = await UserAddress.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(userAddress);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
