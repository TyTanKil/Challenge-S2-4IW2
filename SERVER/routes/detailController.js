const { Router } = require("express");
const Detail = require("../models/detail");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const details = await Detail.findAll({
    where: req.query,
  });
  res.json(details);
});

router.post("/", async (req, res, next) => {
  try {
    const detail = await Detail.create(req.body);
    res.status(201).json(detail);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const detail = await Detail.findByPk(parseInt(req.params.id));
    if (detail) {
      res.json(detail);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, details] = await Detail.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (details[0]) {
      res.json(details[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Detail.destroy({
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
    const nbDeleted = await Detail.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const detail = await Detail.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(detail);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
