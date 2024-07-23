"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_product.belongsTo(models.Order, { foreignKey: "id_order" });
    }
  }
  Order_product.init(
    {
      id_order: DataTypes.INTEGER,
      label: DataTypes.STRING,
      ref: DataTypes.STRING,
      description: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      unit_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Order_product",
      tableName: "order_products",
    }
  );
  return Order_product;
};
