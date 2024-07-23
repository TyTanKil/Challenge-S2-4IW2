"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_addresses.belongsTo(models.account, { foreignKey: "id_user" });
    }
  }
  User_addresses.init(
    {
      id_user: DataTypes.INTEGER,
      number: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      label: DataTypes.STRING,
      google_json: DataTypes.STRING,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_addresses",
      tableName: "user_addresses",
    }
  );
  return User_addresses;
};
