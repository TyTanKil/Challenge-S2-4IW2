<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Ajouter un Produit</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="name" label="Nom du produit" type="text" :modelValue="product.name"
                    @update:modelValue="product.name = $event" required class="mb-4" />
                <FormTextarea id="description" label="Description" :modelValue="product.description"
                    @update:modelValue="product.description = $event" required class="mb-4" />
                <FormInput id="price" label="Prix" type="double" step="0.01" :modelValue="product.price"
                    @update:modelValue="product.price = $event" required class="mb-4" />
                <FormInput id="stock" label="Stock" type="number" :modelValue="product.stock"
                    @update:modelValue="product.stock = $event" required class="mb-4" />
                <FormSelect id="category" label="Catégorie" :options="categories" :modelValue="product.category"
                    @update:modelValue="product.category = $event" required class="mb-4" />
                <FormSelect id="status" label="Statut" :options="statusOptions" :modelValue="product.status"
                    @update:modelValue="product.status = $event" required class="mb-4" />
                <FormFileInput id="image" label="Image" @update:modelValue="handleFileUpload" class="mb-4" />
                <div class="text-right">
                    <button type="submit"
                        class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../../axios'; 
import FormInput from '../formComponents/admin/FormInput.vue';
import FormTextarea from '../formComponents/admin/FormTextarea.vue';
import FormFileInput from '../formComponents/admin/FormFileInput.vue';
import FormSelect from '../formComponents/admin/FormSelect.vue';

const router = useRouter();
const categories = ref([]);
const statusOptions = ref([
    { value: 'active', text: 'Actif' },
    { value: 'inactive', text: 'Inactif' }
]);

const product = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: '',
    status: 'active'
});

const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        product.value.image = `/images/${response.data.filename}`;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get('/categories');
        categories.value = response.data.map(category => ({
            value: category.name,
            text: category.name
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const submitForm = async () => {
    try {
        await axios.post('/products', product.value);
        router.push({ name: 'ProductList' });
    } catch (error) {
        console.error('Error adding product:', error);
    }
};

onMounted(fetchCategories);
</script>

<style scoped></style>
