<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppVerticalCard from '../components/AppVerticalCard.vue';
import AppHorizontalCard from '../components/AppHorizontalCard.vue';
import { useRouter } from 'vue-router';
import ApiClient from '../assets/js/apiClient';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const products = ref([]);
const isVertical = ref(true); // mode par défaut : vertical

const fetchProducts = async () => {
  try {
    const response = await ApiClient.get('/products');
    console.log('Produits récupérés:', response);
    products.value = response;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
  }
};

onMounted(fetchProducts);

function handleSelect(product) {
  router.push({
    name: 'Product',
    params: {
      id: product.id,
      name: product.label,
      description: product.description,
      price: product.unit_price,
      link_img: product.images.length ? product.images[0].url : ''
    }
  });
}

const props = defineProps({
  route: Boolean,
});
</script>

<template>
  <div v-if="props.route">
    <!-- Image principale -->
    <div class="img_main">
      <img src="/src/assets/img/promo/Image_promo_2.png" alt="Image de promo" class="main-img" />
    </div>

    <!-- Bouton pour changer la vue -->
    <div class="toggle-button">
      <button
        @click="isVertical = true"
        :class="['view-button', isVertical ? 'active' : '', 'vertical-button']"
      >
        <img src="/src/assets/img/svg/icons/vertical.svg" alt="Vertical View" />
      </button>
      <button
        @click="isVertical = false"
        :class="['view-button', !isVertical ? 'active' : '', 'horizontal-button']"
      >
        <img src="/src/assets/img/svg/icons/horizontal.svg" alt="Horizontal View" />
      </button>
    </div>

    <!-- Affichage dynamique des cartes -->
    <div class="cards" :class="{ 'horizontal-mode': !isVertical }">
      <component
        v-for="product in products"
        :key="product.id"
        :is="isVertical ? AppVerticalCard : AppHorizontalCard"
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
  transform: scale(1.05);
}

.toggle-button {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.view-button {
  border: 2px solid #1e1e1e;
  border-radius: 8px;
  background-color: transparent;
  padding: 0.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

/* Inactive button: grisâtre */
.view-button img {
  width: 24px;
  height: 24px;
  filter: brightness(0.5);
  transition: filter 0.3s ease;
}

/* Active button: fond + icône contrastée */
.view-button.active {
  background-color: #050E18; /* sombre par défaut */
}

.view-button.active img {
  filter: brightness(0) invert(1); /* rend l'icône blanche */
}

/* Dark theme inverse le fond si besoin */
@media (prefers-color-scheme: light) {
  .view-button.active {
    background-color: black;
  }
}

@media (prefers-color-scheme: dark) {
  .view-button.active {
    background-color: white;
  }

  .view-button.active img {
    filter: brightness(0); /* rend l'icône noire */
  }
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

.cards.horizontal-mode {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  img.main-img {
    border-radius: 12px;
  }
}
</style>
