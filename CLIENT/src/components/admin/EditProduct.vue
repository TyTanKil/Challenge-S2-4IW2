<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8 color-dark">Modifier un Produit</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="label" label="Nom du produit" type="text" :modelValue="product.label"
                    @update:modelValue="product.label = $event" required class="mb-4" />
                <FormTextarea id="description" label="Description" :modelValue="product.description"
                    @update:modelValue="product.description = $event" required class="mb-4" />
                <FormTextarea id="ref" label="Ref" :modelValue="product.ref" @update:modelValue="product.ref = $event"
                    required class="mb-4" />
                <FormInput id="unit_price" label="Prix" type="double" step="0.01" :modelValue="product.unit_price"
                    @update:modelValue="product.unit_price = $event" required class="mb-4" />
                <FormInput id="stock" label="Stock" type="number" :modelValue="product.stock"
                    @update:modelValue="product.stock = $event" required class="mb-4" />
                <FormSelect id="category" label="Catégorie" :options="categories" :modelValue="product.id_category"
                    @update:modelValue="product.id_category = $event" required class="mb-4" />
                <FormSelect id="manufacturer" label="Fabricant" :options="manufacturers"
                    :modelValue="product.id_manufacturer" @update:modelValue="product.id_manufacturer = $event" required
                    class="mb-4" />
                <div v-if="product.currentImage" class="mb-4">
                    <img v-if="product.Product_images && product.Product_images.length"
                                :src="urlServerImg + product.Product_images[0].url" alt="Product Image"
                                class="w-10 h-10 object-cover rounded" />
                            <img v-else src="" alt="Default Image" class="w-10 h-10 object-cover rounded" />
                </div>
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
import { useToast } from 'vue-toast-notification';
import FormSelect from '../formComponents/admin/FormSelect.vue';
import FormInput from '../formComponents/admin/FormInput.vue';
import FormTextarea from '../formComponents/admin/FormTextarea.vue';
import FormFileInput from '../formComponents/admin/FormFileInput.vue';
import ApiClient from '../../assets/js/apiClient';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const categories = ref([]);
const manufacturers = ref([]);
const urlServerImg = import.meta.env.VITE_API_ENDPOINT + '/uploads/';
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

onMounted(async () => {
    const productId = route.params.id;
    try {
        const response = await ApiClient.get(`/products/show/${productId}`);
        product.value = response;
        console.log(response);
        product.value.stock = response.Stock ? response.Stock.quantity : 0;
        if (response.Product_images && response.Product_images.length > 0) {
            product.value.currentImage = `/uploads/${response.Product_images[0].url}`;
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

    if(typeof product.value.unit_price == 'string' && product.value.unit_price.includes(',')){
      product.value.unit_price = product.value.unit_price.replace(',', '.')
    }
    product.value.unit_price = (parseFloat(product.value.unit_price)).toFixed(2)
    formData.append('unit_price', product.value.unit_price);

    formData.append('stock', product.value.stock);
    formData.append('id_category', product.value.id_category);
    formData.append('id_manufacturer', product.value.id_manufacturer);
    if (product.value.image) {
        formData.append('image', product.value.image);
    }

    try {
        await ApiClient.patch(`/products/${productId}`, formData, {
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
        await ApiClient.delete(`/products/${productId}`);
        toast.success('Produit supprimé avec succès');
        router.push({ name: 'ProductList' });
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
