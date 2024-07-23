const { Router } = require("express");
// const Order = require("../models/order");
const checkAuth = require("../middlewares/checkAuth");
// const Order_product = require("../models/orderproduct");
const router = new Router();
const db = require("../db");
const {
  deleteOrderFromMongo,
  syncOrderWithMongo,
} = require("../services/denormalizations/orderService");

const { sequelize, Order, Order_product, account, DataTypes } = db;

// console.log(db);

router.get("/", async (req, res, next) => {
  const orders = await Order.findAll({
    where: req.query,
    include: [
      { model: Order_product },
      {
        model: account,
        attributes: ["firstName", "lastName", "email", "phone"],
      },
    ],
  });
  res.json(orders);
});

// router.post("/", async (req, res, next) => {
//   try {
//     console.log(req.body);

//     const order = await Order.create(req.body);
//     res.status(201).json(order);
//   } catch (e) {
//     next(e);
//   }
// });

router.post("/", async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { order, products } = req.body;

    const createdOrder = await Order.create(order, { transaction: t });

    const createdProducts = await Promise.all(
      products.map((product) =>
        Order_product.create(
          { ...product, id_order: createdOrder.id },
          { transaction: t }
        )
      )
    );

    await t.commit();
    res.status(201).json({ order: createdOrder, products: createdProducts });
  } catch (e) {
    await t.rollback();
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(parseInt(req.params.id), {
      include: [
        { model: Order_product },
        {
          model: account,
          attributes: ["firstName", "lastName", "email", "phone"],
        },
      ],
    });
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, orders] = await Order.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (orders[0]) {
      res.json(orders[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    deleteOrderFromMongo(req.params.id);
  } catch (error) {
    console.error(error);
  }

  try {
    const nbDeleted = await Order.destroy({
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
    const nbDeleted = await Order.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const order = await Order.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(order);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
