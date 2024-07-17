const { Router } = require("express");
const { sequelize, DataTypes } = require("../db");
const Stock = require("../models/stock")(sequelize, DataTypes);
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", async (req, res, next) => {
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
