const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  deleteProductFromMongo,
  syncProductWithMongo,
} = require("../services/denormalizations/productService");

const { Products } = require("../mongo/ProductSchema"); // Remplacez par le chemin correct

const db = require("../db");
// console.log(db);

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

//ROUTE ADMIN PRODUCT
router.get("/list-products", async (req, res, next) => {
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

//POSTGRES ROUTE
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

router.post("/", upload.single("image"), async (req, res, next) => {
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
});

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

router.patch("/:id", upload.single("image"), async (req, res, next) => {
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
});

router.delete("/:id", async (req, res, next) => {
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
