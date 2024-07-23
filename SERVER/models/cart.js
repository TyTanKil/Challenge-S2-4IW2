"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("./db"); // Assurez-vous que la connexion est correcte

class cart extends Model {
  static associate(models) {
    cart.belongsTo(models.account, { foreignKey: "id_user" });
    cart.hasMany(models.cartProduct, { foreignKey: "id_cart" });
  }
}

cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "accounts", // Assurez-vous que cela correspond au nom de la table `account`
        key: "id",
      },
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "cart",
  }
);

module.exports = cart;
