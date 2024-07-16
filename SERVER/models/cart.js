'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cart.belongsTo(models.account, { foreignKey: 'id_user' });
      cart.hasMany(models.cartProduct, { foreignKey: 'id_cart' });
    }
  }
  cart.init({
    id_user: DataTypes.INTEGER,
    expire_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};