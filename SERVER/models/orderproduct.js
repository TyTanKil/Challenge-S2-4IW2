'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      orderProduct.belongsTo(models.order, { foreignKey: 'id_order' });
    }
  }
  orderProduct.init({
    id_order: DataTypes.INTEGER,
    label: DataTypes.STRING,
    ref: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'order_product',
  });
  return orderProduct;
};