const { Router } = require("express");
const Cart = require("../models/cart");
const CartProduct = require("../models/cartproduct");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.post("/", async (req, res, next) => {
  try {
    const { id_user } = req.body;

    if (!id_user) {
      console.error("User ID is required");
      return res.status(400).json({ error: "User ID is required" });
    }

    const expire_date = new Date(Date.now() + 15 * 60 * 1000);
    const cart = await Cart.create({
      id_user,
      expire_date,
    });

    res.status(201).json(cart);
  } catch (e) {
    console.error("Error creating cart:", e);
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(parseInt(req.params.id));
    if (cart) {
      res.json(cart);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const [nbUpdated, carts] = await Cart.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      returning: true,
      individualHooks: true,
    });
    if (carts[0]) {
      res.json(carts[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Cart.destroy({
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

router.put("/", async (req, res, next) => {
  try {
    const { id_user } = req.body;
    console.log(`Received request to update cart for user ID: ${id_user}`);

    if (!id_user) {
      console.error("User ID is required");
      return res.status(400).json({ error: "User ID is required" });
    }

    // Supprimez les paniers existants pour cet utilisateur
    const nbDeleted = await Cart.destroy({
      where: {
        id_user: id_user,
      },
    });

    // Créez un nouveau panier pour cet utilisateur
    const expire_date = new Date(Date.now() + 15 * 60 * 1000);
    const cart = await Cart.create({
      id_user,
      expire_date,
    });

    // Répondez avec le nouveau panier
    res.status(nbDeleted ? 200 : 201).json(cart);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
