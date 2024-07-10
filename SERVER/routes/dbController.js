const { Router } = require("express");
const DB = require("../models/db");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const dbs = await DB.findAll({
    where: req.query,
  });
  res.json(dbs);
});

router.post("/", async (req, res, next) => {
  try {
    const db = await DB.create(req.body);
    res.status(201).json(db);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const db = await DB.findByPk(parseInt(req.params.id));
    if (db) {
      res.json(db);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, dbs] = await DB.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (dbs[0]) {
      res.json(dbs[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await DB.destroy({
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
    const nbDeleted = await DB.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const db = await DB.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(db);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
