"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StockHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StockHistory.belongsTo(models.Product, { foreignKey: "id_product" });
    }
  }
  StockHistory.init(
    {
      id_product: DataTypes.UUID,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StockHistory",
      tableName: "stock_history",
    }
  );
  return StockHistory;
};
