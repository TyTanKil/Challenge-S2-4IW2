<script>
    import ProductItem from '../components/AppCartProduct.vue';

    import ApiClient from '@/assets/js/apiClient';

    import { useStore } from 'vuex';

    const store = useStore();

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
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @remove="removeProduct"
    />
    <div class="total">
      <p>Total TTC: {{ total }}€</p>
      <button @click="placeOrder">Passer commande</button>
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

  button {
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


