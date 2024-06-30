'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order.belongsTo(models.account, { foreignKey: 'id_user' });
      order.hasMany(models.orderProduct, { foreignKey: 'id_order' });
    }
  }
  order.init({
    id_user: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT,
    order_date: DataTypes.DATE,
    order_status: DataTypes.INTEGER,
    delivery_date: DataTypes.DATE,
    delivery_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};