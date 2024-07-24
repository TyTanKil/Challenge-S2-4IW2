const { Router } = require("express");
const { sequelize, DataTypes } = require("../db");
const Stock = require("../models/stock")(sequelize, DataTypes);
const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");
const router = new Router();

router.get("/", async (req, res, next) => {
  const stocks = await Stock.findAll({
    where: req.query,
  });
  res.json(stocks);
});

router.post("/", checkAuthAdmin, async (req, res, next) => {
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

router.post("/ByIdProduct", checkAuth, async (req, res, next) => {
  try {
    const { id_product } = req.body;

    if (!id_product) {
      return res.status(400).json({ error: "id_product is required" });
    }

    const stock = await Stock.findAll({
      where: { id_product },
    });

    if (stock.length > 0) {
      res.json(stock);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error("Error fetching stock:", e);
    next(e);
  }
});

// router.patch("/:id", async (req, res, next) => {
//   const transaction = await sequelize.transaction();
//   try {
//     const { stock, ...productData } = req.body;
//     const [nbUpdated, products] = await Product.update(productData, {
//       where: { id: parseInt(req.params.id) },
//       returning: true,
//       individualHooks: true,
//       transaction,
//     });

//     if (products[0]) {
//       if (stock !== undefined) {
//         await Stock.update(
//           { quantity: stock },
//           { where: { id_product: parseInt(req.params.id) }, transaction }
//         );
//       }
//       await transaction.commit();
//       res.json(products[0]);
//     } else {
//       await transaction.rollback();
//       res.sendStatus(404);
//     }
//   } catch (e) {
//     await transaction.rollback();
//     next(e);
//   }
// });

router.patch("/:id", checkAuth, async (req, res, next) => {
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

router.delete("/:id", checkAuth, async (req, res, next) => {
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

router.put("/:id", checkAuth, async (req, res, next) => {
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
