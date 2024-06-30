const { Router } = require("express");
const Stock = require("../models/stock");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const stocks = await Stock.findAll({
    where: req.query,
  });
  res.json(stocks);
});

router.post("/", async (req, res, next) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const stock = await Stock.findByPk(parseInt(req.params.id));
    if (stock) {
      res.json(stock);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, stocks] = await Stock.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (stocks[0]) {
      res.json(stocks[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Stock.destroy({
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
    const nbDeleted = await Stock.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const stock = await Stock.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(stock);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
