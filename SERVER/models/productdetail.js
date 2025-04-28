'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      productDetail.belongsTo(models.product, { foreignKey: 'id_product' });
      productDetail.belongsTo(models.detail, { foreignKey: 'id_details' });
    }
  }
  productDetail.init({
    id_product: DataTypes.UUID,
    id_details: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_details',
  });
  return productDetail;
};