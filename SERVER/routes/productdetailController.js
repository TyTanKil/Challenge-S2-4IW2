const { Router } = require("express");
const ProductDetail = require("../models/productdetail");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const productsDetail = await ProductDetail.findAll({
    where: req.query,
  });
  res.json(productsDetail);
});

router.post("/", async (req, res, next) => {
  try {
    const productDetail = await ProductDetail.create(req.body);
    res.status(201).json(productDetail);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const productDetail = await ProductDetail.findByPk(parseInt(req.params.id));
    if (productDetail) {
      res.json(productDetail);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, productsDetail] = await ProductDetail.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (productsDetail[0]) {
      res.json(productsDetail[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await ProductDetail.destroy({
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
    const nbDeleted = await ProductDetail.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const productDetail = await ProductDetail.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(productDetail);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
