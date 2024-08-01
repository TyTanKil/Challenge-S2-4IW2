"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Promotion extends Model {
  static associate(models) {
    Promotion.belongsTo(models.Category, { foreignKey: "category", allowNull: true });
    Promotion.belongsTo(models.Product, { foreignKey: "product", allowNull: true });
    Promotion.belongsTo(models.Manufacturer, { foreignKey: "manufacturer", allowNull: true });
  }
}

Promotion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    product: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    manufacturer: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    indexes: [
      {
        unique: true,
        fields: ["id", "code"],
      },
    ],
    modelName: "Promotion",
    tableName: "promotion",
    timestamps: true,
  }
);

Promotion.addHook("afterCreate", async (promotion, options) => {
  try {
    console.log("Promotion créée:", promotion.id);
  } catch (error) {
    console.error("Erreur après création de promotion:", error);
  }
});

Promotion.addHook("afterUpdate", async (promotion, options) => {
  try {
    console.log("Promotion mise à jour:", promotion.id);
  } catch (error) {
    console.error("Erreur après mise à jour de promotion:", error);
  }
});

Promotion.addHook("afterDestroy", async (promotion, options) => {
  try {
    console.log("Promotion supprimée:", promotion.id);
  } catch (error) {
    console.error("Erreur après suppression de promotion:", error);
  }
});

module.exports = Promotion;
