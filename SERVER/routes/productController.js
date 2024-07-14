const { Router } = require("express");
const db = require("../db");
const multer = require("multer");

// console.log(db);
const {
  sequelize,
  Product,
  Category,
  Manufacturer,
  Stock,
  ProductImage,
  DataTypes,
} = db; //KRL

const checkAuth = require("../middlewares/checkAuth");
const router = new Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    });
    res.json(products);
  } catch (e) {
    next(e);
  }
});

// router.post("", async (req, res, next) => {
//   try {
//     const product = await Product.create(req.body);
//     console.log(product);
//     res.status(201).json(product);
//   } catch (e) {
//     next(e);
//   }
// });

// router.post("", upload.array("images", 10), async (req, res, next) => {
//   const t = await sequelize.transaction();
//   try {
//     const product = await Product.create(req.body, { transaction: t });

//     if (req.files) {
//       const imagePromises = req.files.map((file, index) =>
//         ProductImage.create(
//           {
//             id_product: product.id,
//             content: file.buffer,
//             order: index,
//           },
//           { transaction: t }
//         )
//       );
//       await Promise.all(imagePromises);
//     }

//     await t.commit();
//     res.status(201).json(product);
//   } catch (e) {
//     await t.rollback();
//     next(e);
//   }
// });

router.post("/", upload.single("image"), async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const {
      label,
      description,
      unit_price,
      stock,
      id_category,
      id_manufacturer,
    } = req.body;

    const product = await Product.create(
      {
        label,
        description,
        unit_price,
        stock,
        id_category,
        id_manufacturer,
      },
      { transaction: t }
    );

    if (req.file) {
      const imagePath = `/uploads/${req.file.filename}`;
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

// router.patch("/:id", async (req, res, next) => {
//   try {
//     const [nbUpdated, products] = await Product.update(req.body, {
//       where: {
//         id: parseInt(req.params.id),
//       },
//       returning: true,
//       individualHooks: true,
//     });
//     if (products[0]) {
//       res.json(products[0]);
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

router.patch("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const [nbUpdated, products] = await Product.update(req.body, {
      where: { id: productId },
      returning: true,
    });

    if (nbUpdated === 1) {
      const updatedProduct = products[0];
      if (req.body.stock !== undefined) {
        await sequelize.models.Stock.update(
          { quantity: req.body.stock },
          { where: { id_product: productId } }
        );
      }

      return res.json(updatedProduct);
    }

    res.sendStatus(404);
  } catch (error) {
    console.error("Error updating product:", error);
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
