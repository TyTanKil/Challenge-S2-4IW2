<script>
  import { computed, onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import { loadStripe } from '@stripe/stripe-js';
  import ProductItem from '../components/AppCartProduct.vue';
  import ApiClient from '@/assets/js/apiClient';
  import { useToast } from 'vue-toast-notification';

  export default {
    name: 'App',
    components: {
      ProductItem,
    },
    setup() {
      const store = useStore();
      const toast = useToast();
      const products = ref([]);

      // Fonction pour récupérer les produits du panier
      const fetchCartProducts = async (id_user) => {
        try {
          if (id_user == null) {
            throw new Error('L\'ID utilisateur est requis.');
          }

          // Récupérer le panier de l'utilisateur
          const responseCart = await ApiClient.post(`/cart/getByIDUser`, { id_user: id_user });
          if (responseCart.status !== 200) {
            throw new Error('Erreur lors de la récupération du panier : ' + responseCart.statusText);
          }

          const id_cart = responseCart.data.id;

          // Récupérer les produits du panier
          const responseCartProducts = await ApiClient.post(`/cartProduct/products`, { id_cart: id_cart });
          if (responseCartProducts.status !== 200) {
            throw new Error('Erreur lors de la récupération des produits du panier : ' + responseCartProducts.statusText);
          }

          const DataCartProducts = responseCartProducts.data;

          // Récupérer les détails des produits
          const productDetailsPromises = DataCartProducts.map(async (cartProduct) => {
            const { id_product, quantity } = cartProduct;
            try {
              const responseProduct = await ApiClient.get(`/product/show/${id_product}`);
              console.log('Product:', responseProduct.data);
              return {
                label : responseProduct.label,
                description: responseProduct.description,
                unit_price: responseProduct.unit_price,
                id_cart: cartProduct.id_cart,
                quantity: cartProduct.quantity,
                createdAt: cartProduct.createdAt,
                updatedAt: cartProduct.updatedAt,
              };
            } catch (error) {
              console.error(`Erreur lors de la récupération du produit ${id_product}:`, error);
              return null;
            }
          });

          const productsArray = await Promise.all(productDetailsPromises);
          console.log('Products:', productsArray);
          return productsArray.filter(product => product !== null);
        } catch (error) {
          console.error('Erreur lors de la récupération des produits du panier:', error);
          return []; // Retourner un tableau vide en cas d'erreur
        }
      };

      // Fonction pour charger les produits au montage du composant
      const loadProducts = async () => {
        const id_user = store.state.user_id;
        if (id_user) {
          products.value = await fetchCartProducts(id_user);
        } else {
          toast.error('Vous devez être connecté pour voir les produits du panier.');
        }
      };

      onMounted(() => {
        loadProducts(); // Appeler loadProducts lors de la montée du composant
      });

      const cart = computed(() => store.state.cart);

      const productById = (id) => {
        return products.value.find(product => product.id === id);
      };

      const checkout = async () => {
        try {

          const lineItems = products.value.map(product => ({
            price_data: {
              currency: 'eur',
              product_data: {
                name: product.label
              },
              unit_amount: product.unit_price * 100,
            },
            quantity: product.quantity,
          }));

          const response = await ApiClient.post(`/create-checkout-session`, { lineItems: lineItems });

          console.log('Checkout session:', response);

          if (!response.status === 200) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create checkout session');
          }

          const data = await response.data;
          if (data.id) {
            const stripe = await loadStripe('pk_test_51Pb4ZxRplArNYE0A2N3uv8m9TYjIO1xFOgiZj2JQdJIrmyh5LRUobmcIZSkGSntrSEyb79uTGlo78C5vdBjjMj8900RnJ2Issz');
            stripe.redirectToCheckout({ sessionId: data.id });
          }
        } catch (error) {
          console.error('Error creating checkout session:', error);
        }
      };

      return {
        cart,
        products,
        productById,
        checkout,
      };
    },
  };
</script>

<template>
  <div id="app">
    <div v-if="!products.length">Chargement...</div>
    <div v-else>
      <ul v-if="products.length">
        <li v-for="product in products" :key="product.id">
          <h3>{{ product.label }}</h3>
          <p>{{ product.description }}</p>
          <p>Quantité: {{ product.quantity }}</p>
          <p>Prix: {{ product.unit_price }}€</p>
        </li>
      </ul>
      <p v-else>Aucun produit dans le panier.</p>
      <div class="total">
        <p>Total TTC: {{ cartTotal }}€</p>
        <button class="checkout-btn" @click="checkout">Passer commande</button>
      </div>
    </div>
  </div>
</template>

<style>
  .total {
    width: 200px; /* Largeur du carré */
    height: 200px; /* Hauteur du carré */
    right: 20px; /* Distance du bord droit de l'écran */
    top: 20px; /* Distance du bord supérieur de l'écran */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 10px; /* Bords arrondis */
    padding: 10px; /* Espacement interne */
    text-align: center;
  }

  .checkout-btn {
    border-radius: 10px;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px; /* Espacement entre le bouton et le texte */
  }

  /* Style pour le mode clair */
  @media (prefers-color-scheme: light) {
    .total {
      background-color: #575757; /* Couleur de fond */
      color: rgb(255, 255, 255);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre pour un effet de surélévation */
    }

    button {
      background-color: #8bc34a;
      color: rgb(255, 255, 255);
    }

    button:hover {
      background-color: #7cb342;
    }
  }

  /* Style pour le mode sombre */
  @media (prefers-color-scheme: dark) {
    .total {
      background-color: #333333; /* Couleur de fond */
      color: white;
      box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2); /* Ombre pour un effet de surélévation */
      border: 1px solid #ffffff; /* Couleur de la bordure */
    }

    button {
      background-color: #555555;
      color: #ffffff;
    }

    button:hover {
      background-color: #666666;
    }
  }
</style>
  