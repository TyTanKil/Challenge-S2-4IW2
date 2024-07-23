<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppVerticalCard from '../components/AppVerticalCard.vue';
import { useRouter } from 'vue-router';
import ApiClient from '../assets/js/apiClient';
import {useStore} from "vuex";

const router = useRouter();
const products = ref([]);

const store = useStore(); // Accéder au store Vuex

const fetchProducts = async () => {
  try {
    const response = await ApiClient.get('/products');
    products.value = response;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(fetchProducts);

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

const props = defineProps({
  route: Boolean,
});
</script>

<template>
  <div v-if="props.route">
    <div class="img_main">
      <img src="/src/assets/img/promo/Image_promo_2.png" alt="Image de promo" class="main-img">
    </div>
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
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.img_main{
  width: 100%;
  display: flex;
  justify-content: center;
  margin: -1.5rem auto 1rem;
}
img.main-img{
  width: 70%;
  height: auto;
}
</style>
