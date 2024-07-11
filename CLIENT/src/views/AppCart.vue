<script>
    import ProductItem from './components/AppCartProduct.vue';

    export default {
    name: 'App',
    components: {
        ProductItem,
    },
    data() {
        return {
        products: [],
        };
    },
    computed: {
        total() {
        return this.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        },
    },
    methods: {
        fetchProducts() {
        axios.get('http://localhost:3000/products')
            .then(response => {
            this.products = response.data;
            });
        },
        removeProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
        },
        placeOrder() {
        alert('Commande passée!');
        },
    },
    mounted() {
        this.fetchProducts();
    },
    };
</script>

<template>
    <div id="app">
      <h1>Panier</h1>
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @remove="removeProduct"
      />
      <div class="total">
        Total TTC: {{ total }}€
      </div>
      <button @click="placeOrder">Passer commande</button>
    </div>
</template>
  
<style>
  .total {
    margin-top: 20px;
    font-weight: bold;
  }
  button {
    background-color: #8bc34a;
    border: none;
    padding: 10px;
    cursor: pointer;
    color: white;
  }
  button:hover {
    background-color: #7cb342;
  }
</style>