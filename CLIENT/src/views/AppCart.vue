<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { loadStripe } from '@stripe/stripe-js';
import ProductItem from '../components/AppCartProduct.vue';
import ApiClient from '@/assets/js/apiClient';
import AppHorizontalCard from '../components/AppHorizontalCard.vue';
import { useToast } from 'vue-toast-notification';
import Swal from 'sweetalert2';

export default {
  name: 'App',
  components: {
    ProductItem,
    AppHorizontalCard,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const products = ref([]);
    const promoCode = ref('');
    const discount = ref(0);
    const accountId = ref(null);

    const fetchCartProducts = async (id_user) => {
      try {
        if (id_user == null) {
          throw new Error('L\'ID utilisateur est requis.');
        }

        const responseCart = await ApiClient.post(`/cart/getByIDUser`, { id_user: id_user });
        if (responseCart.status !== 200) {
          throw new Error('Erreur lors de la récupération du panier : ' + responseCart.statusText);
        }

        const id_cart = responseCart.data.id;
        const responseCartProducts = await ApiClient.post(`/cartProduct/products`, { id_cart: id_cart });
        if (responseCartProducts.status !== 200) {
          throw new Error('Erreur lors de la récupération des produits du panier : ' + responseCartProducts.statusText);
        }

        const DataCartProducts = responseCartProducts.data;

        const productDetailsPromises = DataCartProducts.map(async (cartProduct) => {
          const { id_product, quantity } = cartProduct;
          try {
            const responseProduct = await ApiClient.get(`/product/show/${id_product}`);
            return {
              label: responseProduct.label,
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
        return productsArray.filter(product => product !== null);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits du panier:', error);
        return [];
      }
    };

    const loadProducts = async () => {
      const id_user = store.state.user_id;
      accountId.value = id_user; // Set the account ID
      if (id_user) {
        products.value = await fetchCartProducts(id_user);
      } else {
        toast.error('Vous devez être connecté pour voir les produits du panier.');
      }
    };

    onMounted(() => {
      loadProducts();
    });

    const cart = computed(() => store.state.cart);

    const cartTotal = computed(() => {
      return products.value.reduce((total, product) => {
        return total + (product.unit_price * product.quantity);
      }, 0).toFixed(2);
    });

    const discountAmount = computed(() => {
      return (cartTotal.value * discount.value / 100).toFixed(2);
    });

    const finalTotal = computed(() => {
      return (cartTotal.value - discountAmount.value).toFixed(2);
    });

    const validatePromoCode = async () => {
      try {
        const response = await ApiClient.post('/payment/validate-promo-code', { promoCode: promoCode.value, accountId: accountId.value });
        if (response.status === 200 && response.data.valid) {
          discount.value = response.data.discount;
          toast.success(`Code promo validé! Vous bénéficiez de ${discount.value}% de réduction.`);
        } else {
          discount.value = 0;
          toast.error('Code promo invalide.');
        }
      } catch (error) {
        discount.value = 0;
        toast.error('Erreur lors de la validation du code promo.');
      }
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

        const response = await ApiClient.post(`/payment/create-checkout-session`, {
          lineItems: lineItems,
          promoCode: promoCode.value,
          accountId: accountId.value
        });

        if (response.status !== 200) {
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

    const confirmCheckout = async () => {
      const result = await Swal.fire({
        title: 'Êtes-vous sûr de vouloir payer ?',
        text: `Le montant total est de ${finalTotal.value}€.`,
        showCancelButton: true,
        confirmButtonText: 'Oui, payer',
        cancelButtonText: 'Non, annuler',
      });

      if (result.isConfirmed) {
        await checkout();
      }
    };

    return {
      cart,
      products,
      cartTotal,
      promoCode,
      discount,
      discountAmount,
      finalTotal,
      validatePromoCode,
      confirmCheckout,
    };
  },
};
</script>

<template>
  <div id="app" class="container">
    <div v-if="products.length" class="cart content">
      <div class="cards_cart">
        <ProductItem
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :label="product.label"
          :description="product.description"
          :price="product.unit_price"
          :quantity="product.quantity"
        />
      </div>
      
      <div class="total">
        <div class="amount-section">
          <p>Total TTC: <span>{{ cartTotal }}€</span></p>
          <div class="promo-section">
            <input v-model="promoCode" type="text" placeholder="Code promo">
            <button @click="validatePromoCode">Appliquer</button>
          </div>
          <p v-if="discount > 0">Promo : <span class="discount">-{{ discountAmount }}€</span></p>
          <p>Total après remise: <span>{{ finalTotal }}€</span></p>
        </div>
        <button class="checkout-btn" @click="confirmCheckout">Passer commande</button>
      </div>
    </div>
    <div v-else>
      <p>Aucun produit dans le panier.</p>
    </div>
  </div>
</template>

<style>
.cart.content {
  display: flex;
  flex: 1; /* Prend toute la largeur disponible */
}

.cards_cart {
  flex: 3; /* Prend une plus grande partie de l'espace disponible */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.total {
  flex: 1; /* Prend une partie plus petite de l'espace disponible */
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  padding: 20px; /* Espacement interne */
  border-radius: 10px; /* Bords arrondis */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre pour un effet de surélévation */
  margin-left: 20px; /* Espacement entre les produits et le total */
  background-color: #575757; /* Couleur de fond */
  color: rgb(255, 255, 255);
}

.promo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px; /* Espacement entre la section promo et le reste */
}

.promo-section input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px; /* Espacement entre le champ et le bouton */
  width: 100%;
  box-sizing: border-box;
}

.promo-section button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #8bc34a;
  color: rgb(255, 255, 255);
  width: 100%;
}

.promo-section button:hover {
  background-color: #7cb342;
}

.amount-section {
  width: 100%;
  text-align: center;
  margin-bottom: 20px; /* Espacement entre la section des montants et le bouton */
}

.amount-section p {
  margin: 5px 0;
}

.amount-section span {
  font-weight: bold;
  &.discount{
    color: rgb(253, 84, 84);
  }
}

.checkout-btn {
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #8bc34a;
  color: rgb(255, 255, 255);
  width: 100%;
}

.checkout-btn:hover {
  background-color: #7cb342;
}

/* Style pour le mode clair */
@media (prefers-color-scheme: light) {
  .total {
    background-color: #575757; /* Couleur de fond */
    color: rgb(255, 255, 255);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre pour un effet de surélévation */
  }

  .promo-section button,
  .checkout-btn {
    background-color: #8bc34a;
    color: rgb(255, 255, 255);
  }

  .promo-section button:hover,
  .checkout-btn:hover {
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

  .promo-section button,
  .checkout-btn {
    background-color: #555555;
    color: #ffffff;
  }

  .promo-section button:hover,
  .checkout-btn:hover {
    background-color: #666666;
  }
}
</style>
