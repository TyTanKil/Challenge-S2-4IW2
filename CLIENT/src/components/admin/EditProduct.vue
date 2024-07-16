<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Modifier un Produit</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="label" label="Nom du produit" type="text" :modelValue="product.label"
                    @update:modelValue="product.label = $event" required class="mb-4" />
                <FormTextarea id="description" label="Description" :modelValue="product.description"
                    @update:modelValue="product.description = $event" required class="mb-4" />
                <FormTextarea id="ref" label="Ref" :modelValue="product.ref"
                        @update:modelValue="product.ref = $event" required class="mb-4" />
                <FormInput id="unit_price" label="Prix" type="number" step="0.01" :modelValue="product.unit_price"
                    @update:modelValue="product.unit_price = $event" required class="mb-4" />
                <FormInput id="stock" label="Stock" type="number" :modelValue="product.stock"
                    @update:modelValue="product.stock = $event" required class="mb-4" />
                <FormSelect id="category" label="Catégorie" :options="categories" :modelValue="product.id_category"
                    @update:modelValue="product.id_category = $event" required class="mb-4" />
                <FormSelect id="manufacturer" label="Fabricant" :options="manufacturers"
                    :modelValue="product.id_manufacturer" @update:modelValue="product.id_manufacturer = $event" required
                    class="mb-4" />
                <div v-if="product.currentImage" class="mb-4">
                    <img v-if="product.ProductImages && product.ProductImages.length"
                        :src="urlServerImg + product.ProductImages[0].url" alt="Product Image"
                        class="w-10 h-10 object-cover rounded" />
                    <img v-else src="" alt="Default Image" class="w-10 h-10 object-cover rounded" />                </div>
                <FormFileInput id="image" label="Image" @update:modelValue="handleFileUpload" class="mb-4" />
                <div class="flex justify-between items-center">
                    <button type="submit"
                        class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Enregistrer
                    </button>
                    <button type="button" @click="confirmDelete"
                        class="bg-customRed hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Supprimer
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '../../axios';
import { useToast } from 'vue-toastification';
import FormSelect from '../formComponents/admin/FormSelect.vue';
import FormInput from '../formComponents/admin/FormInput.vue';
import FormTextarea from '../formComponents/admin/FormTextarea.vue';
import FormFileInput from '../formComponents/admin/FormFileInput.vue';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const categories = ref([]);
const manufacturers = ref([]);
const urlServerImg = 'http://localhost:3000/uploads/'; // A remplacer par le lien du server
const product = ref({
    label: '',
    description: '',
    ref: '',
    unit_price: 0,
    stock: 0,
    id_category: '',
    id_manufacturer: '',
    currentImage: '',
    image: null,
});

const fetchCategories = async () => {
    try {
        const response = await axios.get('/category');
        categories.value = response.data.map(category => ({
            value: category.id,
            text: category.label
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const fetchManufacturers = async () => {
    try {
        const response = await axios.get('/manufacturer');
        manufacturers.value = response.data.map(manufacturer => ({
            value: manufacturer.id,
            text: manufacturer.label
        }));
    } catch (error) {
        console.error('Error fetching manufacturers:', error);
    }
};

onMounted(async () => {
    const productId = route.params.id;
    try {
        const response = await axios.get(`/products/${productId}`);
        product.value = response.data;
        product.value.stock = response.data.Stock ? response.data.Stock.quantity : 0;
        if (response.data.ProductImages && response.data.ProductImages.length > 0) {
            product.value.currentImage = `/uploads/${response.data.ProductImages[0].url}`;
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
    fetchCategories();
    fetchManufacturers();
});

const handleFileUpload = (file) => {
    product.value.image = file;
};

const submitForm = async () => {
    const productId = route.params.id;
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
        await axios.patch(`/products/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toast.success('Produit modifié avec succès');
        router.push({ name: 'ProductList' });
    } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Erreur lors de la modification du produit');
    }
};

const confirmDelete = () => {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
        deleteProduct();
    }
};

const deleteProduct = async () => {
    const productId = route.params.id;
    try {
        await axios.delete(`/products/${productId}`);
        toast.success('Produit supprimé avec succès');
        router.push({ name: 'ProductList' });
    } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Erreur lors de la suppression du produit');
    }
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
