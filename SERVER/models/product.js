"use strict";
const { Model, DataTypes } = require("sequelize");
// const {
//   syncroDeleteProduct,
// } = require("../services/denormalizations/productService");

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
      Product.hasMany(models.Product_image, {
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
      tableName: "product",
      hooks: {
        afterCreate: async (product, options) => {
          try {
            const {
              syncProductWithMongo,
            } = require("../services/denormalizations/productService");
            if (options.transaction) {
              options.transaction.afterCommit(() =>
                syncProductWithMongo(product.id)
              );
            } else {
              await syncProductWithMongo(product.id);
            }
          } catch (error) {
            console.error("Syncro:", error);
          }
        },
        afterUpdate: async (product, options) => {
          try {
            const {
              syncProductWithMongo,
            } = require("../services/denormalizations/productService");
            if (options.transaction) {
              options.transaction.afterCommit(() =>
                syncProductWithMongo(product.id)
              );
            } else {
              await syncProductWithMongo(product.id);
            }
          } catch (error) {
            console.error(
              "Erreur lors de la synchronisation après mise à jour:",
              error
            );
          }
        },
        afterDestroy: async (product, options) => {
          try {
            console.log("Produit supprimé:", product.dataValues.id);
          } catch (error) {
            console.error("Erreur lors de la suppression:", error);
          }
        },
      },
    }
  );
  return Product;
};
