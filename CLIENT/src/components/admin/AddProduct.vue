<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Ajouter un Produit</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="label" label="Nom du produit" type="text" :modelValue="product.label"
                    @update:modelValue="product.label = $event" required class="mb-4" />
                <FormTextarea id="description" label="Description" :modelValue="product.description"
                    @update:modelValue="product.description = $event" required class="mb-4" />
                <FormTextarea id="ref" label="Ref" :modelValue="product.ref" @update:modelValue="product.ref = $event"
                    required class="mb-4" />
                <FormInput id="unit_price" label="Prix" type="double" :modelValue="product.unit_price"
                    @update:modelValue="product.unit_price = $event" required class="mb-4" />
                <FormInput id="stock" label="Stock" type="number" :modelValue="product.stock"
                    @update:modelValue="product.stock = $event" required class="mb-4" />
                <FormSelect id="category" label="Catégorie" :options="categories" :modelValue="product.id_category"
                    @update:modelValue="product.id_category = $event" required class="mb-4" />
                <FormSelect id="manufacturer" label="Fabricant" :options="manufacturers"
                    :modelValue="product.id_manufacturer" @update:modelValue="product.id_manufacturer = $event" required
                    class="mb-4" />
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
import ApiClient from '../../assets/js/apiClient'; 
import FormInput from '../formComponents/admin/FormInput.vue';
import FormTextarea from '../formComponents/admin/FormTextarea.vue';
import FormFileInput from '../formComponents/admin/FormFileInput.vue';
import FormSelect from '../formComponents/admin/FormSelect.vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const router = useRouter();
const categories = ref([]);
const manufacturers = ref([]);
const product = ref({
    label: '',
    description: '',
    ref: '',
    unit_price: 0,
    stock: 0,
    id_category: '',
    id_manufacturer: '',
    image: null,
});

const handleFileUpload = (file) => {
    product.value.image = file;
};

const fetchCategories = async () => {
    try {
        const response = await ApiClient.get('/category');
        categories.value = response.map(category => ({
            value: category.id,
            text: category.label
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const fetchManufacturers = async () => {
    try {
        const response = await ApiClient.get('/manufacturer');
        manufacturers.value = response.map(manufacturer => ({
            value: manufacturer.id,
            text: manufacturer.label
        }));
    } catch (error) {
        console.error('Error fetching manufacturers:', error);
    }
};

const submitForm = async () => {
    const formData = new FormData();
    formData.append('label', product.value.label);
    formData.append('description', product.value.description);
    formData.append('ref', product.value.ref);
    formData.append('unit_price', product.value.unit_price);
    formData.append('stock', product.value.stock);
    formData.append('id_category', product.value.id_category);
    formData.append('id_manufacturer', product.value.id_manufacturer);
    if (product.value.image) {
        formData.append('image', product.value.image);
    }

    try {
        await ApiClient.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        router.push({ name: 'ProductList' });
        toast.success('Produit ajouté avec succès');
    } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Erreur lors de l\'ajout du produit');
    }
};

onMounted(() => {
    fetchCategories();
    fetchManufacturers();
});
</script>

<style scoped>
</style>
