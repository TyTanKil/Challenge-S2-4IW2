<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div class="w-full max-w-lg">
        <h1 class="text-2xl font-bold mb-8 color-dark">Ajouter stock</h1>
        <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div class="mb-6">
            <label for="label" class="block text-sm font-medium text-gray-700 mb-2">Nom du produit</label>
            <input  id="label" type="text" :value="product.label" class="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring focus:ring-customGreen focus:border-customGreen color-dark " readonly />
          </div>
            <div class="mb-6">
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <p id="category" class="p-2 border border-gray-300 rounded-md bg-gray-100 color-dark">{{ getCategoryName(product.id_category) }}</p>
          </div>
            <div class="mb-6">
            <label for="stock" class="block text-sm font-medium text-gray-700 mb-2">Stock Actuel</label>
            <input id="stock" type="number" :value="product.stock" class="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring focus:ring-customGreen focus:border-customGreen color-dark" readonly />
          </div>
            <FormInput id="stockAddition" label="Quantité de stock à ajouter" type="number" v-model="stockToAdd" :min="0" class="mb-4 color-dark" @input="validateStockAddition" />
          <div class="flex justify-between items-center">
            <button type="submit"
              class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
              Enregistrer
            </button>
            <button type="button" @click="goBack"
              class="bg-customGreen hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
              Retour
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useToast } from 'vue-toast-notification';
  import FormInput from '../formComponents/admin/FormInput.vue';
  import ApiClient from '../../assets/js/apiClient';
  
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  const categories = ref([]);
  const stockToAdd = ref(0);
  const product = ref({
    label: '',
    stock: 0,
    id_category: '',
  });
  
  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await ApiClient.get('/category');
      categories.value = response.map(category => ({
        value: category.id,
        text: category.label,
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  // Get category name from its id
  const getCategoryName = (id) => {
    const category = categories.value.find(category => category.value === id);
    return category ? category.text : 'N/A';
  };
  
  // Fetch product details
  onMounted(async () => {
    const productId = route.params.id;
    try {
      const response = await ApiClient.get(`/products/show/${productId}`);
      product.value = response;
      product.value.stock = response.Stock ? response.Stock.quantity : 0;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
    fetchCategories();
  });
  
  // Fonction pour valider que l'input d'ajout de stock n'est pas négatif
  const validateStockAddition = () => {
    if (stockToAdd.value < 0) {
      stockToAdd.value = 0;
    }
  };
  
  // Submit form with updated stock
  const submitForm = async () => {
    const productId = route.params.id;
    const newStock = product.value.stock + parseInt(stockToAdd.value);
    const formData = new FormData();
    formData.append('label', product.value.label);
    formData.append('stock', newStock);
    formData.append('id_category', product.value.id_category);
  
    try {
      await ApiClient.patch(`/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await ApiClient.post('/stock-history', {
        id_product: productId,
        quantity: parseInt(stockToAdd.value),
      });

      toast.success('Stock ajouté avec succès');
      
      // Met à jour le stock actuel à l'affichage
      product.value.stock = newStock;
      
      // Réinitialise le champ "Ajouter au stock" à 0
      stockToAdd.value = 0;
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Erreur lors de la modification du produit');
    }
  };
  
  // Fonction pour retourner à la liste des produits
  const goBack = () => {
    router.push({ name: 'StockList' });
  };
  </script>
  
  <style scoped>
  @media (prefers-color-scheme: dark) {
  .color-dark {
      color: #575757;
  }
}
  </style>
  