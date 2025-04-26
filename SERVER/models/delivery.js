"use strict";
const { Model, DataTypes } = require("sequelize");
const { Sequelize } = require("../db");

module.exports = (sequelize, DataTypes) => {
  class deliveryStatus extends Model {
    static associate(models) {
      deliveryStatus.belongsTo(models.Order, { foreignKey: "id_order" });
    }
  }

  deliveryStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "order",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      status: {
        type: DataTypes.ENUM({
          values: ["En attente", "Expédié", "Livré", "Annulé"]
        }),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "delivery_status",
      tableName: "delivery_status",
      timestamps: false,
    }
  );
  return deliveryStatus;
};
