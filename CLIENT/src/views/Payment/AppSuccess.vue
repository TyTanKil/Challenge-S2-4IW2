<template>
  <div class="success-page">
    <h1>Achat Réussi !</h1>
    <p>Merci pour votre achat. Votre commande a été passée avec succès.</p>
    <p>Vous allez recevoir un email de confirmation contenant la facture de votre achat.</p>
    <p>Si vous avez des questions, n'hésitez pas à nous contacter à support@tech-shop.tech.</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>

<script>
  import { ref, onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
  import ApiClient from '@/assets/js/apiClient';

  export default {
    setup() {
      const store = useStore();
      const orderDetails = ref(null);
      const errorMessage = ref(null);
      const productsArray = ref([]);

      const fetchOrderDetails = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (!sessionId) {
          errorMessage.value = "Session de paiement invalide.";
          return;
        }

        try {
          const response = await ApiClient.get(`/orders/${sessionId}`);
          orderDetails.value = response.data;
        } catch (error) {
          errorMessage.value = "Erreur lors de la récupération des détails de la commande.";
        }
      };

      const addCartToOrder = async () => {
        try {
          const id_user = store.state.user_id;
          // Récupérer le panier de l'utilisateur
          const responseCart = await ApiClient.get(`/cart/getByIDUser/${id_user}`);

          const id_cart = responseCart.id;

          // Récupérer les produits du panier
          const responseGetCartProducts = await ApiClient.get(`/cartproduct/products/${id_cart}`);

          const DataCartProducts = responseGetCartProducts;

          // Récupérer les détails des produits
          const productDetailsPromises = DataCartProducts.map(async (cartProduct) => {
            const { id_product, quantity } = cartProduct;
            try {
              const responseProduct = await ApiClient.get(`/product/show/${id_product}`);
              return {
                label: responseProduct.label,
                ref: responseProduct.ref,
                description: responseProduct.description,
                unit_price: responseProduct.unit_price,
                quantity: cartProduct.quantity
              };
            } catch (error) {
              console.error(`Erreur lors de la récupération du produit ${id_product}:`, error);
              return null;
            }
          });

          productsArray.value = await Promise.all(productDetailsPromises);

          console.log('ProductArrays:', productsArray.value);

          const cartTotal = computed(() => {
            return productsArray.value.reduce((total, product) => {
              return total + (product.unit_price * product.quantity);
            }, 0).toFixed(2); // Formatage en deux décimales
          });

          const orderData = {
              id_user: id_user,
              total_price: cartTotal.value,
              order_status: 1,
              delivery_status: 1
          };

          const productsData = productsArray._value;

          // Convertir l'objet en JSON
          const orderJSON = JSON.stringify(orderData, null, 2);
          const productsJSON = JSON.stringify(productsData, null, 2);

          console.log('Order JSON:', orderJSON);
          console.log('Products JSON:', productsJSON);

          const responseProduct = await ApiClient.post(`/order`, { order: orderData, products: productsData });

          console.log('Response:', responseProduct);

        } catch (error) {
          console.error('Erreur lors de la récupération des produits du panier:', error);
          return []; // Retourner un tableau vide en cas d'erreur
        }
      };

      onMounted(() => {
        fetchOrderDetails();
        addCartToOrder();
      });

      return {
        orderDetails,
        errorMessage,
        productsArray
      };
    },
  };
</script>

<style>
  .success-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  .success-page h1 {
    color: #A0DB10;
  }

  .success-page p {
    margin: 10px 0;
  }

  .success-page a {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    color: #000;
    background-color: #A0DB10;
    text-decoration: none;
    border-radius: 5px;
  }

  .success-page a:hover {
    background-color: #C4F649;
  }
</style>
