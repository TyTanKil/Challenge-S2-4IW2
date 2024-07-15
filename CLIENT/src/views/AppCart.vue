<template>
    <div class="cart-page">
      <h1>Your Cart</h1>
      <ul>
        <li v-for="item in cart" :key="item.productId">
          <span v-if="productById(item.productId)">
            {{ productById(item.productId).name }} - {{ (productById(item.productId).amount / 100).toFixed(2) }} € x {{ item.quantity }}
          </span>
        </li>
      </ul>
      <p>Total: {{ (cartTotal / 100).toFixed(2) }} €</p>
      <button @click="checkout">Checkout</button>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    setup() {
      const store = useStore();
  
      onMounted(() => {
        store.dispatch('fetchProducts');
      });
  
      const cart = computed(() => store.state.cart);
      const products = computed(() => store.state.products);
  
      const productById = (id) => {
        return products.value.find(product => product.id === id);
      };
  
      const cartTotal = computed(() => {
        return cart.value.reduce((total, item) => {
          const product = productById(item.productId);
          return total + (product ? product.amount * item.quantity : 0);
        }, 0);
      });
  
      const checkout = async () => {
        try {
          const response = await fetch('http://localhost:3000/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart: cart.value }),
          });
  
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create checkout session');
          }
  
          const data = await response.json();
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
        cartTotal,
        productById,
        checkout,
      };
    },
  };
  </script>
  