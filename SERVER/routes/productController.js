const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const newProductTemplate = require("../templates-mail/new-product");
const restockProductTemplate = require("../templates-mail/restock");
const OutOfStockTemplate = require("../templates-mail/no-stock");

const { sendEmail } = require("../mailer");
const {
  deleteProductFromMongo,
  syncProductWithMongo,
} = require("../services/denormalizations/productService");

const { Products } = require("../mongo/ProductSchema");
const db = require("../db");
// console.log(db);
const Account = require("../models/account");
const Sequelize = require("sequelize");

const {
  sequelize,
  Product,
  Category,
  Manufacturer,
  Stock,
  Product_image,
  DataTypes,
} = db; //pour asso

const checkAuth = require("../middlewares/checkAuth");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");
const router = new Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Fonction pour récupérer tous les utilisateurs
const getAllStoreKeeper = async () => {
  return await Account.findAll({
    where: {
      roles: {
        [Sequelize.Op.contains]: ["ROLE_STORE_KEEPER"],
      },
    },
  });
};

//ROUTE ADMIN PRODUCT
router.get("/list-products", checkAuthAdmin, async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: req.query,
      include: [
        { model: Category },
        { model: Manufacturer },
        { model: Stock },
        { model: Product_image },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(products);
  } catch (e) {
    next(e);
  }
});

//MONGO ROUTE
router.get("", async (req, res, next) => {
  try {
    const filter = req.query || {};
    const products = await Products.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    next(e);
  }
});

//Mongo ROUTE
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/",
  checkAuthAdmin,
  upload.single("image"),
  async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const {
        label,
        description,
        ref,
        unit_price,
        stock,
        id_category,
        id_manufacturer,
      } = req.body;

      const product = await Product.create(
        {
          label,
          description,
          ref,
          unit_price,
          stock,
          id_category,
          id_manufacturer,
        },
        { transaction: t }
      );

      // Envoi d'email à tous les store Keeper
      const accounts = await getAllStoreKeeper();
      const category = await Category.findByPk(id_category);
      const productName = label;
      const productPrice = unit_price;
      const categoryName = category.label;

      accounts.forEach((account) => {
        if (account.notification) {
          const mailOptions = newProductTemplate({
            to: account.email,
            productName: productName,
            userName: account.firstName,
            price: productPrice,
            categoryName: categoryName,
          });
          sendEmail(mailOptions);
        }
      });

      if (req.file) {
        const imagePath = req.file.filename;
        await Product_image.create(
          {
            id_product: product.id,
            url: imagePath,
          },
          { transaction: t }
        );
      }

      // Mise à jour des stocks
      const quantity = req.body.stock;
      await Stock.create(
        {
          id_product: product.id,
          quantity: quantity,
        },
        { transaction: t }
      );

      await t.commit();

      // try {
      //   syncProductWithMongo(product.id);
      // } catch (error) {
      //   console.error(error);
      // }

      res.status(201).json({ product });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
);

router.get("/show/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(parseInt(req.params.id), {
      include: [
        { model: Category },
        { model: Manufacturer },
        { model: Stock },
        { model: Product_image },
      ],
    });

    if (product) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/:id",
  checkAuthAdmin,
  upload.single("image"),
  async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const {
        label,
        description,
        ref,
        unit_price,
        stock,
        id_category,
        id_manufacturer,
      } = req.body;

      const existingProduct = await Product.findByPk(req.params.id, {
        include: [Product_image],
      });

      if (!existingProduct) {
        await t.rollback();
        return res.sendStatus(404);
      }

      const oldStock = existingProduct.Stock
        ? existingProduct.Stock.quantity
        : 0;

      const [nbUpdated] = await Product.update(
        {
          label,
          description,
          ref,
          unit_price,
          stock,
          id_category,
          id_manufacturer,
        },
        { where: { id: req.params.id }, transaction: t }
      );

      if (nbUpdated === 0) {
        await t.rollback();
        return res.sendStatus(404);
      }

      if (stock !== undefined) {
        await Stock.update(
          { quantity: stock },
          { where: { id_product: req.params.id }, transaction: t }
        );

        // Détection du réapprovisionnement
        if (stock > oldStock) {
          const accounts = await getAllStoreKeeper();
          const productName = existingProduct.label;

          accounts.forEach((account) => {
            if (account.notification) {
              const mailOptions = restockProductTemplate({
                to: account.email,
                userName: account.firstName,
                productName: productName,
              });
              sendEmail(mailOptions);
            }
          });
        }

        // Vérification si le stock tombe à 0
        if (stock <= 3) {
          const accounts = await getAllStoreKeeper();
          const productName = existingProduct.label;

          accounts.forEach((account) => {
            if (account.notification) {
              const mailOptions = OutOfStockTemplate({
                to: account.email,
                userName: account.firstName,
                productName: productName,
              });
              sendEmail(mailOptions);
            }
          });
        }
      }

      if (req.file) {
        const imagePath = req.file.filename;
        const existingImage = await Product_image.findOne({
          where: { id_product: req.params.id },
          transaction: t,
        });

        if (existingProduct.Product_images.length > 0) {
          const oldImagePath = path.join(
            __dirname,
            "../uploads",
            existingProduct.Product_images[0].url
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        if (existingImage) {
          existingImage.url = imagePath;
          await existingImage.save({ transaction: t });
        } else {
          await Product_image.create(
            {
              id_product: req.params.id,
              url: imagePath,
            },
            { transaction: t }
          );
        }
      }

      await t.commit();

      const product = await Product.findByPk(req.params.id, {
        include: [Category, Manufacturer, Stock, Product_image],
      });

      try {
        syncProductWithMongo(product.id);
      } catch (error) {
        console.error(error);
      }

      res.json(product);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
);

router.delete("/:id", checkAuthAdmin, async (req, res, next) => {
  try {
    deleteProductFromMongo(req.params.id);
  } catch (error) {
    console.error(error);
  }
  try {
    const nbDeleted = await Product.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (nbDeleted === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Product.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const product = await Product.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(product);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
