<template>
    <div class="search-results-container">
      <aside class="filters">
        <h3>Filtres</h3>
        <div class="filter-group">
          <label for="price-min">Prix Min</label>
          <input type="number" v-model="priceMin" placeholder="Prix Min">
        </div>
        <div class="filter-group">
          <label for="price-max">Prix Max</label>
          <input type="number" v-model="priceMax" placeholder="Prix Max">
        </div>
        <div class="filter-group">
          <label for="quantity-min">Quantité Min</label>
          <input type="number" v-model="quantityMin" placeholder="Quantité Min">
        </div>
        <div class="filter-group">
          <label for="manufacturer">Fabricant</label>
          <select v-model="selectedManufacturer">
            <option value="">Tous</option>
            <option v-for="manufacturer in manufacturers" :key="manufacturer" :value="manufacturer">{{ manufacturer }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="category">Catégorie</label>
          <select v-model="selectedCategory">
            <option value="">Toutes</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
      </aside>
      <div class="products">
        <div v-if="filteredProducts.length === 0">Aucun produit trouvé</div>
        <AppVerticalCard
          v-for="product in filteredProducts"
          :key="product._id"
          :id="product.id"
          :label="product.label"
          :description="product.description"
          :price="product.unit_price"
          :link_img="product.images?.length ? 'http://localhost:3000/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
          @select="handleSelect(product)"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import AppVerticalCard from '../components/AppVerticalCard.vue';
  import ApiClient from '../assets/js/apiClient';
  
  const route = useRoute();
  const router = useRouter();
  
  const searchQuery = ref(route.query.q || '');
  const products = ref([]); // Initialisé à un tableau vide
  const priceMin = ref(0);
  const priceMax = ref(1000);
  const quantityMin = ref(0);
  const selectedManufacturer = ref('');
  const selectedCategory = ref('');
  
  const manufacturers = ref([]);
  const categories = ref([]);
  
  const fetchProducts = async () => {
    try {
      const response = await ApiClient.get('/products');
      products.value = response || [];
      console.log(products.value);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const fetchManufacturers = async () => {
    try {
      const response = await ApiClient.get('/manufacturer');
      manufacturers.value = response.map(manufacturer => manufacturer.label);
      console.log(manufacturers.value);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await ApiClient.get('/category');
      categories.value = response.map(category => category.label);
      console.log(categories.value);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  onMounted(() => {
    fetchProducts();
    fetchManufacturers();
    fetchCategories();
  });
  
  const filteredProducts = computed(() => {
    if (!products.value) return []; // Si `products.value` est indéfini, retourner un tableau vide
    return products.value.filter(product => {
      const matchesSearch = product.label.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesPrice = product.unit_price >= priceMin.value && product.unit_price <= priceMax.value;
      const matchesQuantity = product.stock?.quantity >= quantityMin.value;
      const matchesManufacturer = !selectedManufacturer.value || (product.manufacturer?.label === selectedManufacturer.value);
      const matchesCategory = !selectedCategory.value || (product.category?.label === selectedCategory.value);
  
      return matchesSearch && matchesPrice && matchesQuantity && matchesManufacturer && matchesCategory;
    });
  });
  
  const handleSelect = (product) => {
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
  };
  </script>
  
  <style scoped>
  .search-results-container {
    display: flex;
  }
  
  .filters {
    width: 25%;
    padding: 1rem;
    background-color: #f8f8f8;
    border-right: 1px solid #ddd;
  }
  
  .filter-group {
    margin-bottom: 1rem;
  }
  
  .products {
    width: 75%;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  /* Mode sombre */
  @media (prefers-color-scheme: dark) {
    .search-results-container {
      background-color: #2a2a2a;
      color: #f8f8f8;
    }
  
    .filters {
      background-color: #3a3a3a;
      border-right: 1px solid #555;
    }
  
    .filter-group input,
    .filter-group select {
      background-color: #555;
      color: #f8f8f8;
    }
  
    .products {
      background-color: #2a2a2a;
    }
  }
  </style>
  