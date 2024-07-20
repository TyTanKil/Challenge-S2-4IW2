'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detail.belongsTo(models.category, { foreignKey: 'id_category' });
      detail.hasMany(models.productDetail, { foreignKey: 'id_details' });
    }
  }
  detail.init({
    id_category: DataTypes.INTEGER,
    label: DataTypes.STRING,
    type: DataTypes.STRING,
    unit: DataTypes.STRING,
    group: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'details',
  });
  return detail;
};