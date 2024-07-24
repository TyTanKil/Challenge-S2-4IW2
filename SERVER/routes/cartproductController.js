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

router.get("/getByIds/:id_cart/:id_product", async (req, res, next) => {
  try {
    const { id_cart, id_product } = req.params;

    const cartProduct = await CartProduct.findOne({
      where: {
        id_cart: parseInt(id_cart),
        id_product: parseInt(id_product),
      },
    });

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
        id_cart: parseInt(req.params.id),
      },
    });

    res.sendStatus(204);

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

    // Check if the cart product already exists
    const existingCartProduct = await CartProduct.findOne({
      where: {
        id_cart,
        id_product
      }
    });

    if (existingCartProduct) {
      // If it exists, update the quantity
      existingCartProduct.quantity += quantity || 1; // Increment by the provided quantity or by 1 if not provided
      await existingCartProduct.save();
      res.status(200).json(existingCartProduct);
    } else {
      // If it does not exist, create a new cart product
      const newCartProduct = await CartProduct.create({
        id_cart,
        id_product,
        quantity: quantity || 1 // Default to 1 if not specified
      });
      res.status(201).json(newCartProduct);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    next(error);
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const { id_cart } = req.body;

    // Vérifiez si `id_cart` est fourni
    if (!id_cart) {
      return res.status(400).json({ error: 'id_cart is required' });
    }

    const cartProducts = await CartProduct.findAll({
      where: { id_cart }
    });

    res.status(200).json(cartProducts);
  } catch (error) {
    console.error('Error fetching products from cart:', error);
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const id_cart = req.params.id;

    const cartProducts = await CartProduct.findAll({
      where: { id_cart }
    });

    if (cartProducts) {
      res.json(cartProducts);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
