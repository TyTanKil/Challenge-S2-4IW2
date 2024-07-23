const { Router } = require("express");
const { Orders } = require("../mongo/OrderSchema");
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

//MONGO ROUTE
router.get("/show", async (req, res, next) => {
  try {
    const filter = req.query || {};
    const orders = await Orders.find(filter).sort({ createdAt: -1 });
    res.json(orders);
    console.log("MONGO");
  } catch (e) {
    next(e);
  }
});

//MONGO ROUTE POUR REVUPERER LE TOTAL DES CLIENTS
router.get("/total-users", async (req, res, next) => {
  try {
    const totalUsers = await Orders.aggregate([
      {
        $group: {
          _id: "$account.id",
        },
      },
      {
        $count: "totalUsers",
      },
    ]);
    res.json({ totalUsers: totalUsers[0]?.totalUsers || 0 });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//MONGO POUR OBTENIR LE TOTAL DES VENTES
router.get("/total-sales", async (req, res, next) => {
  try {
    // Total des ventes
    const totalSales = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total_price" },
        },
      },
    ]);
    res.json({ totalSales: totalSales[0]?.totalSales || 0 });
  } catch (error) {
    console.error("Error fetching total sales:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//MONGO GET TOTAL COMMANDE
router.get("/total-orders", async (req, res, next) => {
  try {
    // Nombre total de commandes
    const totalOrders = await Orders.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    console.error("Error fetching total orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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

//ADMIN GET Data dashboard
// router.get("/totalSales", async (req, res, next) => {
//   try {
//     // Total des ventes
//     const totalSales = await Orders.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalSales: { $sum: "$total_price" },
//         },
//       },
//     ]);

// Nombre total d'utilisateurs
// const totalUsers = await Orders.distinct("account.id").then(
//   (users) => users.length
// );

// Nombre total de commandes
// const totalOrders = await Orders.countDocuments();

// Produits les plus vendus
// const topProducts = await Orders.aggregate([
//   { $unwind: "$Order_products" },
//   {
//     $group: {
//       _id: "$Order_products.label",
//       totalSales: {
//         $sum: {
//           $multiply: [
//             "$Order_products.unit_price",
//             "$Order_products.quantity",
//           ],
//         },
//       },
//       totalQuantity: { $sum: "$Order_products.quantity" },
//     },
//   },
//   { $sort: { totalSales: -1 } },
//   { $limit: 5 },
//   {
//     $project: {
//       _id: 0,
//       name: "$_id",
//       sales: "$totalSales",
//       quantity: "$totalQuantity",
//     },
//   },
// ]);

//     res.json({
//       salesData: totalSales[0]?.totalSales || 0,
//       //userCount: totalUsers,
//       //topProducts: topProducts,
//     });
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/total-users", async (req, res, next) => {
  try {
    // Agrégation pour compter les comptes uniques
    const totalUsers = await Orders.aggregate([
      {
        $group: {
          _id: "$account.id",
        },
      },
      {
        $count: "totalUsers",
      },
    ]);

    res.json({ totalUsers: totalUsers[0]?.totalUsers || 0 });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
