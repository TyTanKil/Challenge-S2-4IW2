<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppVerticalCard from '../components/AppVerticalCard.vue';
import { useRouter } from 'vue-router';
import ApiClient from '../assets/js/apiClient'; // Assurez-vous que le chemin est correct

const router = useRouter();
const products = ref([]);

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
    <div class="cards">
      <AppVerticalCard 
          v-for="product in products" 
          :key="product._id" 
          :id="product.id"
          :label="product.label"
          :description="product.description"
          :price="product.unit_price"
          :link_img="product.images?.length ? 'http://localhost:3000/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
          @select="() => handleSelect(product)"/>
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
