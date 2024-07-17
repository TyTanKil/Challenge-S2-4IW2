// store.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
    cart: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, { productId, quantity }) {
      const productInCart = state.cart.find(item => item.productId === productId);
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        state.cart.push({ productId, quantity });
      }
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/products');
        commit('setProducts', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
});

export default store;
