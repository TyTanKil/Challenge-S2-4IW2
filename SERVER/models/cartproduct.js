'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cartProduct.belongsTo(models.cart, { foreignKey: 'id_cart' });
      cartProduct.belongsTo(models.product, { foreignKey: 'id_product' });
    }
  }
  cartProduct.init({
    id_cart: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cartProduct',
  });
  return cartProduct;
};