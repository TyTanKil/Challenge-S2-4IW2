"use strict";
const { Model, DataTypes } = require("sequelize");
const { Sequelize } = require("../db");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.account, { foreignKey: "id_user" });
      Order.hasMany(models.Order_product, { foreignKey: "id_order" });
      Order.hasMany(models.DeliveryStatus, { foreignKey: "id_order" });
    }
  }
  Order.init(
    {
      id_user: DataTypes.UUID,
      total_price: DataTypes.FLOAT,
      order_date: DataTypes.DATE,
      order_status: DataTypes.INTEGER,
      expected_delivery_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          return date;
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "order",
      hooks: {
        afterCreate: async (order, options) => {
          try {
            console.log("OORRDER");
            const {
              syncOrderWithMongo,
            } = require("../services/denormalizations/orderService");
            if (options.transaction) {
              options.transaction.afterCommit(() =>
                syncOrderWithMongo(order.id)
              );
            } else {
              await syncOrderWithMongo(order.id);
            }
          } catch (error) {
            console.error("Syncro:", error);
          }
        },
        afterCreate: async (order, options) => {
          try {
            const {
              syncOrderWithMongo,
            } = require("../services/denormalizations/orderService");
            if (options.transaction) {
              options.transaction.afterCommit(() =>
                syncOrderWithMongo(order.id)
              );
            } else {
              await syncOrderWithMongo(order.id);
            }
          } catch (error) {
            console.error("Syncro:", error);
          }
        },
        afterDestroy: async (order, options) => {
          try {
            console.log("Produit supprimé:", order.dataValues.id);
            await Order.deleteOne({ id: orderId });
          } catch (error) {
            console.error("Erreur lors de la suppression:", error);
          }
        },
      },
    }
  );
  return Order;
};
