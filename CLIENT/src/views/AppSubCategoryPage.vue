<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import AppVerticalCard from '../components/AppVerticalCard.vue';
import ApiClient from '../assets/js/apiClient';
import {useStore} from "vuex";

const router = useRouter();
const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = 12;
const totalProducts = ref(0);

const store = useStore(); // Accéder au store Vuex

const fetchProducts = async () => {
  try {
    const response = await ApiClient.get('/products');
    products.value = response;
    console.log(products.value);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(fetchProducts);

watch([router.params, currentPage], fetchProducts);

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

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value * itemsPerPage < totalProducts.value) {
    currentPage.value++;
  }
};
</script>

<template>
  <div>
    <div class="cards">
      <AppVerticalCard 
          v-for="product in products" 
          :key="product._id" 
          :id="product.id"
          :label="product.label"
          :description="product.description"
          :price="product.unit_price"
          :link_img="product.images?.length ? store.state.api_endpoint + '/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
          @select="() => handleSelect(product)"/>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage * itemsPerPage >= totalProducts">Suivant</button>
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 10px;
}
</style>
