const { Products } = require("../../mongo/ProductSchema"); // Assurez-vous d'importer votre modèle MongoDB correctement
const db = require("../../db/index");
const dbMongo = require("../../mongo/db");
const {
  sequelize,
  Product,
  Category,
  Manufacturer,
  Stock,
  Product_image,
  DataTypes,
} = db;

// console.log("DDDDDBBBBBBB", db);

async function syncProductWithMongo(productId) {
  try {
    // Récupérer les données du produit depuis PostgreSQL
    console.log(productId);
    const product = await Product.findByPk(productId, {
      include: [
        { model: Category },
        { model: Manufacturer },
        { model: Product_image },
        { model: Stock },
      ],
    });
    if (!product) {
      throw new Error("Product not found in PostgreSQL");
    }
    console.log("Postgressssss", product);
    const productData = {
      id: product.id,
      ref: product.ref,
      label: product.label,
      unit_price: product.unit_price,
      description: product.description,
      category: {
        id: product.Category.dataValues.id,
        label: product.Category.dataValues.label,
      },
      manufacturer: {
        id: product.Manufacturer.dataValues.id,
        label: product.Manufacturer.dataValues.label,
      },
      stock: {
        id: product.Stock.dataValues.id,
        quantity: product.Stock.dataValues.quantity,
      },
      images: product.Product_images
        ? product.Product_images.map((image) => ({
            id: image.dataValues.id,
            url: image.dataValues.url,
          }))
        : [],
    };
    await Products.findOneAndUpdate({ id: product.id }, productData, {
      upsert: true,
      new: true,
    });
    // console.log(productData);
    console.log("Product synced with MongoDB");
    // console.log("RESULT", productData);
  } catch (error) {
    console.error("Error syncing product with MongoDB:", error);
  }
}

async function deleteProductFromMongo(productId) {
  try {
    await Products.deleteOne({ id: productId });
    console.log(`Product ${productId} deleted from MongoDB`);
  } catch (error) {
    console.error("Error deleting product from MongoDB:", error);
    throw error;
  }
  console.log("PRRRROOOOODDDDDDD", productId);
}

// async function syncroDeleteProduct(productId) {
//   const transaction = await sequelize.transaction();
//   try {
//     // Récupérer le produit depuis PostgreSQL
//     const product = await Product.findByPk(productId, {
//       include: [
//         { model: Category },
//         { model: Manufacturer },
//         { model: ProductImage },
//         { model: Stock },
//       ],
//       transaction,
//     });

//     if (!product) {
//       throw new Error("Product not found in PostgreSQL");
//     }

//     // Supprimer le produit de PostgreSQL
//     await product.destroy({ transaction });

//     // Supprimer le produit de MongoDB
//     await ProductMongo.deleteOne({ id: productId });

//     // Commit la transaction de PostgreSQL
//     await transaction.commit();

//     console.log("Product deleted from PostgreSQL and MongoDB");
//   } catch (error) {
//     // Rollback la transaction de PostgreSQL en cas d'erreur
//     await transaction.rollback();
//     console.error("Error deleting product from PostgreSQL and MongoDB:", error);
//   }
// }

module.exports = {
  syncProductWithMongo,
  deleteProductFromMongo,
};
