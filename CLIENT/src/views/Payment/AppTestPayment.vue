<template>
    <div class="home-page">
      <h1>Welcome to the Stripe Payment Demo</h1>
      <router-link to="/cart">Go to Cart</router-link>
  
      <h2>Products</h2>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ (product.amount / 100).toFixed(2) }} €
          <select v-model="quantities[product.id]">
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
          <button @click="addToCart(product.id)">Add to Cart</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const products = ref([]);
      const quantities = ref({});
  
      onMounted(async () => {
        await store.dispatch('fetchProducts');
        products.value = store.state.products;
  
        products.value.forEach(product => {
          quantities.value[product.id] = 1;
        });
      });
  
      const addToCart = (productId) => {
        const quantity = quantities.value[productId];
        if (quantity > 0) {
          store.commit('addToCart', { productId, quantity });
        }
      };
  
      return {
        products,
        quantities,
        addToCart,
      };
    },
  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
  