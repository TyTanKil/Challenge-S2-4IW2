'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      productImage.belongsTo(models.product, { foreignKey: 'id_product' });
    }
  }
  productImage.init({
    id_product: DataTypes.INTEGER,
    content: DataTypes.BLOB,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_images',
  });
  return productImage;
};