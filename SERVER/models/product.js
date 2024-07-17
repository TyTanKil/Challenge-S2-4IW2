"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "id_category",
        allowNull: true, // Permettre les valeurs nulles
      });
      Product.belongsTo(models.Manufacturer, {
        foreignKey: "id_manufacturer",
        allowNull: true, // Permettre les valeurs nulles
      });
      Product.hasOne(models.Stock, { foreignKey: "id_product" });
      Product.hasMany(models.ProductImage, {
        foreignKey: "id_product",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_manufacturer: DataTypes.INTEGER,
      id_category: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ref: DataTypes.STRING,
      label: DataTypes.STRING,
      unit_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: DataTypes.STRING,
      stock: {
        type: DataTypes.VIRTUAL,
        get() {
          return this._stock;
        },
        set(value) {
          this._stock = value;
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      hooks: {
        afterCreate: async (product, options) => {
          const Stock = sequelize.models.Stock;
          console.log(product);
          try {
            await Stock.create({
              id_product: product.id,
              quantity: product.stock,
            });
          } catch (error) {
            console.error("Error creating stock:", error);
          }
        },
      },
      afterUpdate: async (product, options) => {
        const Stock = sequelize.models.Stock;
        try {
          console.log(product);
          await Stock.update(
            { quantity: product.stock },
            { where: { id_product: product.id } }
          );
        } catch (error) {
          console.error("Error updating stock:", error);
        }
      },
    }
  );
  return Product;
};
