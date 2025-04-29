const { Orders } = require("../../mongo/OrderSchema"); // Assurez-vous d'importer votre modèle MongoDB correctement
const db = require("../../db/index");
const dbMongo = require("../../mongo/db");
const { sequelize, Order, Order_product, account, DataTypes } = db;

async function syncOrderWithMongo(orderId) {
  try {
    // Récupérer les données de la commande depuis PostgreSQL
    console.log(orderId);
    const order = await Order.findByPk(orderId, {
      include: [{ model: account }, { model: Order_product }],
    });

    if (!order) {
      throw new Error("Order not found in PostgreSQL");
    }

    const orderData = {
      id: order.id,
      account: {
        id: order.account.id,
        firstName: order.account.firstName,
        lastName: order.account.lastName,
        email: order.account.email,
        phone: order.account.phone,
      },
      total_price: order.total_price,
      order_date: order.order_date,
      order_status: order.order_status,
      expected_delivery_date: order.expected_delivery_date,
      Order_products: order.Order_products
        ? order.Order_products.map((product) => ({
            id_order: product.id_order,
            label: product.label,
            ref: product.ref,
            quantity: product.quantity,
            unit_price: product.unit_price,
          }))
        : [],
    };

    console.log(orderData);

    await Orders.findOneAndUpdate({ id: order.id }, orderData, {
      upsert: true,
      new: true,
    });
    console.log("Order synced with MongoDB");
  } catch (error) {
    console.error("Error syncing order with MongoDB:", error);
  }
}

async function deleteOrderFromMongo(orderId) {
  try {
    await Orders.deleteOne({ id: orderId });
    console.log(`Order ${orderId} deleted from MongoDB`);
  } catch (error) {
    console.error("Error deleting order from MongoDB:", error);
    throw error;
  }
}

module.exports = {
  syncOrderWithMongo,
  deleteOrderFromMongo,
};
