const { Router } = require("express");
const db = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// console.log(db);
const {
  sequelize,
  Product,
  Category,
  Manufacturer,
  Stock,
  ProductImage,
  DataTypes,
} = db; //asso

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

router.get("", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: req.query,
      include: [
        { model: Category },
        { model: Manufacturer },
        { model: Stock },
        { model: ProductImage },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(products);
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
      await ProductImage.create(
        {
          id_product: product.id,
          url: imagePath,
        },
        { transaction: t }
      );
    }

    await t.commit();

    res.status(201).json({ product });
  } catch (error) {
    await t.rollback();
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(parseInt(req.params.id), {
      include: [
        { model: Category },
        { model: Manufacturer },
        { model: Stock },
        { model: ProductImage },
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
      status,
    } = req.body;

    const existingProduct = await Product.findByPk(req.params.id, {
      include: [ProductImage],
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
        status,
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
      const existingImage = await ProductImage.findOne({
        where: { id_product: req.params.id },
        transaction: t,
      });

      if (existingProduct.ProductImages.length > 0) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads",
          existingProduct.ProductImages[0].url
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      if (existingImage) {
        existingImage.url = imagePath;
        await existingImage.save({ transaction: t });
      } else {
        await ProductImage.create(
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
      include: [Category, Manufacturer, Stock, ProductImage],
    });
    res.json(product);
  } catch (error) {
    await t.rollback();
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
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
