const { Router } = require("express");
const CartProduct = require("../models/cartproduct");
const Product = require("../models/product");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/", checkAuth, async (req, res, next) => {
  const cartsProduct = await CartProduct.findAll({
    where: req.query,
  });
  res.json(cartsProduct);
});

router.post("/", async (req, res, next) => {
  try {
    const cartProduct = await CartProduct.create(req.body);
    res.status(201).json(cartProduct);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cartProduct = await CartProduct.findByPk(parseInt(req.params.id));
    if (cartProduct) {
      res.json(cartProduct);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, cartsProduct] = await CartProduct.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (cartsProduct[0]) {
      res.json(cartsProduct[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await CartProduct.destroy({
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
    const nbDeleted = await CartProduct.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const cartProduct = await CartProduct.create({
      ...req.body,
      id: parseInt(req.params.id),
    });
    res.status(nbDeleted ? 200 : 201).json(cartProduct);
  } catch (e) {
    next(e);
  }
});

router.post('/addProduct', async (req, res, next) => {
  try {
    const { id_cart, id_product, quantity } = req.body;

    const cartProduct = await CartProduct.create({
      id_cart,
      id_product,
      quantity: quantity || 1 // Défaut à 1 si non spécifié
    });

    res.status(201).json(cartProduct);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    next(error);
  }
});

router.get('/:id_cart/products', async (req, res, next) => {
  try {
    const { id_cart } = req.params;

    const cartProducts = await CartProduct.findAll({
      where: { id_cart },
      include: [{ model: Product, as: 'product' }]
    });

    res.status(200).json(cartProducts);
  } catch (error) {
    console.error('Error fetching products from cart:', error);
    next(error);
  }
});

module.exports = router;
