'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./db');

class cartProduct extends Model {
  static associate(models) {
    cartProduct.belongsTo(models.cart, { foreignKey: 'id_cart' });
    cartProduct.belongsTo(models.product, { foreignKey: 'id_product' });
  }
}

cartProduct.init({
  id_cart: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cart',
      key: 'id'
    }
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize: connection,
  modelName: 'cart_products',
});

module.exports = cartProduct;
