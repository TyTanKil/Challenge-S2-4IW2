"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductImage.belongsTo(models.Product, { foreignKey: "id_product" });
    }
  }
  ProductImage.init(
    {
      id_product: DataTypes.INTEGER,
      content: DataTypes.BLOB,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductImage",
      tableName: "productImages",
    }
  );
  return ProductImage;
};
