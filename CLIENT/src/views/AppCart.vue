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
        loading: true,
        error: null
        };
    },
    computed: {
        total() {
        return this.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        },
    },
    methods : {
      async fetchCartProducts() {
        try {
            const id_user = store.state.user_id;
            
            if (id_user == null) {
                toast.error('Vous devez être connecté pour ajouter un produit au panier');
                this.loading = false;
                return;
            }

            let responseCart = await ApiClient.get(`/cart/${id_user}`);
            if (responseCart.status === 200) {
                const cartId = responseCart.data.id;
                console.log('Cart ID:', cartId);
                let responseCartProducts = await ApiClient.get(`/cartProduct/products`,  { id_cart: cartId } );
                
                if (responseCartProducts.status === 200) {
                    const DataCartProducts = responseCartProducts.data;

                    // Fetch product details for each product in the cart
                    const productDetailsPromises = DataCartProducts.map(async product => {
                        const { id_product, quantity } = product;

                        try {
                            let responseProduct = await ApiClient.get(`/product/${id_product}`);
                            const productData = responseProduct.data;

                            return {
                                ...productData,
                                id_cart: product.id_cart,
                                quantity: product.quantity,
                                createdAt: product.createdAt,
                                updatedAt: product.updatedAt
                            };
                        } catch (error) {
                            console.error(`Error fetching product ${id_product}:`, error);
                            return null;
                        }
                    });

                    // Wait for all product details to be fetched
                    const products = await Promise.all(productDetailsPromises);

                    // Filter out any null values (in case of errors)
                    this.products = products.filter(product => product !== null);

                    console.log('Updated products in state:', this.products);
                    toast.success('Produits ajoutés au panier avec succès');
                } else {
                    console.error('Error fetching products from cart:', responseCartProducts.statusText);
                }
            } else {
                console.error('Error fetching cart:', responseCart.statusText);
            }
        } catch (error) {
            console.error('Error fetching products from cart:', error);
            this.error = 'Erreur lors de la récupération des produits.';
        } finally {
            this.loading = false;
        }
      },
      created() {
        this.fetchCartProducts();
      }
    },
    };
</script>

<template>
  <div id="app">
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <ul v-if="products.length">
        <li v-for="product in products" :key="product.id">
          <h3>{{ product.Product.label }}</h3>
          <p>{{ product.Product.description }}</p>
          <p>Quantité: {{ product.quantity }}</p>
          <p>Prix: {{ product.Product.unit_price }}€</p>
        </li>
      </ul>
      <p v-else>Aucun produit dans le panier.</p>
      <div class="total">
      <p>Total TTC: {{ total }}€</p>
      <button @click="placeOrder">Passer commande</button>
    </div>
    </div>
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @remove="removeProduct"
    />
    
    <button @click="test">test</button>
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


