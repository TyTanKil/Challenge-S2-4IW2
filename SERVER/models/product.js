'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.belongsTo(models.category, { foreignKey: 'id_category' });
      product.belongsTo(models.manufacturer, { foreignKey: 'id_manufacturer' });
      product.hasMany(models.productImage, { foreignKey: 'id_product' });
      product.hasMany(models.productDetail, { foreignKey: 'id_product' });
      product.hasMany(models.cartProduct, { foreignKey: 'id_product' });
      product.hasOne(models.stock, { foreignKey: 'id_product' });
    }
  }

  product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    id_manufacturer: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
    ref: DataTypes.STRING,
    label: DataTypes.STRING,
    unit_price: DataTypes.FLOAT,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
    tableName: 'products',
    timestamps: true,
  });

  return product;
};