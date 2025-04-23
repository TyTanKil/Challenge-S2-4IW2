"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class newsletter extends Model {
  static associate(models) {
  }
}

newsletter.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      object: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      sent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize: connection,
      modelName: "newsletter",
      timestamps: false,
    }
);

module.exports = newsletter;