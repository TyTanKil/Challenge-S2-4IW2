<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold color-dark">Liste des Produits</h1>
            <div class="flex gap-3">
                <button
                    class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                    <router-link to="/admin/stock-evolution">Évolution des stocks</router-link>
                </button>
                <button @click="addProduct"
                    class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                    <router-link to="/admin/product/new">Ajouter un produit</router-link>
                </button>
            </div>
        </div>
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Rechercher des produits..."
                class="color-dark w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full bg-white">
                <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th class="py-3 px-6 text-left">Image</th>
                        <th class="py-3 px-6 text-left">Nom</th>
                        <th class="py-3 px-6 text-center">Prix</th>
                        <th class="py-3 px-6 text-center">Stock</th>
                        <th class="py-3 px-6 text-center">Catégorie</th>
                        <th class="py-3 px-6 text-center">Statut</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr v-if="paginatedProducts.length === 0">
                        <td colspan="9" class="text-center py-4">Aucun produit</td>
                    </tr>
                    <tr v-else v-for="product in paginatedProducts" :key="product.id"
                        class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left">
                            <img v-if="product.Product_images && product.Product_images.length"
                                :src="urlServerImg + product.Product_images[0].url" alt="Product Image"
                                class="w-10 h-10 object-cover rounded" />
                            <img v-else src="" alt="Default Image" class="w-10 h-10 object-cover rounded" />
                        </td>
                        <td class="py-3 px-6 text-left">{{ product.label }}</td>
                        <td class="py-3 px-6 text-center">{{ product.unit_price.toFixed(2) }} €</td>
                        <td class="py-3 px-6 text-center">{{ product.Stock ? product.Stock.quantity : 0 }}</td>
                        <td class="py-3 px-6 text-center">{{ product.Category ? product.Category.label : 'Non catégorisé' }}</td>
                        <td class="py-3 px-6 text-center">
                            <span
                                :class="{ 'bg-customGreen px-4 py-1 rounded-lg text-white': (product.Stock && product.Stock.quantity > 0), 'btn-red text-white px-4 py-1 rounded-lg': !(product.Stock && product.Stock.quantity > 0) }">
                                {{ product.Stock && product.Stock.quantity > 0 ? 'Actif' : 'Inactif' }}
                            </span>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center space-x-2 w-full gap-4">
                                <button @click="addStock(product.id)"
                                    class="bg-customGreen hover:bg-customGreen-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 w-1/3 flex items-center justify-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button @click="confirmDelete(product.id)"
                                    class="btn-red hover:bg-customGreen-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 w-1/3 flex items-center justify-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mt-10 space-x-2" v-if="totalPages > 1">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="flex px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div class="flex items-center space-x-1">
                <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                    :class="['px-3 py-2 rounded-md transition duration-200', currentPage === page ? 'bg-customGreen text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400']">
                    {{ page }}
                </button>
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="flex px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import ApiClient from '../../assets/js/apiClient';

const products = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const router = useRouter();
const toast = useToast();

const urlServerImg = import.meta.env.VITE_API_ENDPOINT + '/uploads/';

const fetchProducts = async () => {
    try {
        const response = await ApiClient.get('/products/list-products');
        products.value = response;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const filteredProducts = computed(() => {
    return products.value.filter(product =>
        product.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (product.Category && product.Category.label.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (product.Manufacturer && product.Manufacturer.label.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
});

const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.value.slice(start, end);
});

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

onMounted(fetchProducts);

const addProduct = () => {
    router.push({ name: 'AddProduct' });
};

const addStock = (id) => {
    router.push({ name: 'AddStock', params: { id } });
};

const confirmDelete = (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
        deleteProduct(id);
    }
};

const deleteProduct = async (id) => {
    try {
        await ApiClient.delete(`/products/${id}`);
        products.value = products.value.filter(product => product.id !== id);
        toast.success('Produit supprimé avec succès');
    } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Erreur lors de la suppression du produit');
    }
};
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  .color-dark {
      color: #575757;
  }
}
</style>