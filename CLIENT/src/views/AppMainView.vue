<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppVerticalCard from '../components/AppVerticalCard.vue';
import { useRouter } from 'vue-router';
import ApiClient from '../assets/js/apiClient';
import { useStore } from 'vuex';

const store = useStore(); // Accéder au store Vuex
const router = useRouter();
const products = ref([]);

// Fonction pour récupérer les produits
const fetchProducts = async () => {
  try {
    const response = await ApiClient.get('/products');
    products.value = response;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(fetchProducts);

// Fonction pour gérer la sélection d'un produit
function handleSelect(product) {
  router.push({
    name: 'Product',
    params: {
      id: product._id,
      name: product.label,
      description: product.description,
      price: product.unit_price,
      link_img: product.images.length ? product.images[0].url : ''
    }
  });
}

// Définition des propriétés du composant
const props = defineProps({
  route: Boolean,
});
</script>

<template>
  <div v-if="props.route">
    <!-- Image principale avec animation au survol -->
    <div class="img_main">
      <img src="/src/assets/img/promo/Image_promo_2.png" alt="Image de promo" class="main-img" />
    </div>

    <!-- Affichage des cartes produits -->
    <div class="cards">
      <AppVerticalCard
        v-for="product in products"
        :key="product._id"
        :id="product.id"
        :label="product.label"
        :description="product.description"
        :price="product.unit_price"
        :link_img="product.images?.length ? store.state.api_endpoint + '/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
        @select="() => handleSelect(product)"
      />
    </div>
  </div>
</template>

<style scoped>
.img_main {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  padding: 0 1rem;
  position: relative;
}

img.main-img {
  width: 80%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

img.main-img:hover {
  cursor: pointer;
  transform: scale(1.05); /* Effet de zoom au survol */
}

/* Container des cartes produits */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-top: 2rem;
  position: relative;
}

/* Adaptation au mode sombre */
@media (prefers-color-scheme: dark) {
  img.main-img {
    border-radius: 12px;
  }
}
</style>
