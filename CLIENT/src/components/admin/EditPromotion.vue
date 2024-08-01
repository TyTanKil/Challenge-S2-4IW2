<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Modifier la Promotion</h1>
        </div>
        <form @submit.prevent="updatePromotion" class="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div class="grid grid-cols-1 gap-6">
                <div class="mb-4">
                    <label for="code" class="block text-gray-700">Code</label>
                    <input v-model="promotion.code" id="code" type="text"
                        class="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div class="mb-4">
                    <label for="discount" class="block text-gray-700">Réduction (%)</label>
                    <input v-model="promotion.discount" id="discount" type="number" min="0" max="100"
                        class="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>

                <!--
                <div class="mb-4">
                    <label for="category" class="block text-gray-700">Catégorie</label>
                    <select v-model="promotion.category" id="category"
                        class="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="" selected>Aucune</option>
                        <option v-for="category in categories" :key="category.id" :value="category.label">
                            {{ category.label }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="product" class="block text-gray-700">Produit</label>
                    <select v-model="promotion.product" id="product"
                        class="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="" selected>Aucun</option>
                        <option v-for="product in products" :key="product.id" :value="product.label">
                            {{ product.label }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="manufacturer" class="block text-gray-700">Fabricant</label>
                    <select v-model="promotion.manufacturer" id="manufacturer"
                        class="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="" selected>Aucun</option>
                        <option v-for="manufacturer in manufacturers" :key="manufacturer.id" :value="manufacturer.label">
                            {{ manufacturer.label }}
                        </option>
                    </select>
                </div> 
                -->

                <div class="mb-4">
                    <label for="startDate" class="block text-gray-700">Date de début</label>
                    <input v-model="promotion.startDate" id="startDate" type="date"
                        class="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div class="mb-4">
                    <label for="endDate" class="block text-gray-700">Date de fin</label>
                    <input v-model="promotion.endDate" id="endDate" type="date"
                        class="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
            </div>
            <div class="text-right">
                <button type="submit"
                    class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                    Modifier
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import ApiClient from '../../assets/js/apiClient';

const promotion = ref({
    code: '',
    discount: 0,
    // category: '',
    // product: '',
    startDate: '',
    endDate: ''
});

const categories = ref([]);
const products = ref([]);

const route = useRoute();
const router = useRouter();
const toast = useToast();

const fetchPromotion = async () => {
    try {
        const response = await ApiClient.get(`/promotions/${route.params.id}`);
        promotion.value = response;
    } catch (error) {
        console.error('Error fetching promotion:', error);
    }
};

const fetchCategories = async () => {
    try {
        const response = await ApiClient.get('/categories');
        categories.value = response;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const fetchProducts = async () => {
    try {
        const response = await ApiClient.get('/products');
        products.value = response;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const updatePromotion = async () => {
    try {
        await ApiClient.put(`/promotions/${route.params.id}`, promotion.value);
        toast.success('Promotion mise à jour avec succès');
        router.push({ name: 'PromotionList' });
    } catch (error) {
        console.error('Error updating promotion:', error);
        toast.error('Erreur lors de la mise à jour de la promotion');
    }
};

const goBack = () => {
    router.push({ name: 'PromotionList' });
};

onMounted(() => {
    fetchPromotion();
    fetchCategories();
    fetchProducts();
});
</script>
A