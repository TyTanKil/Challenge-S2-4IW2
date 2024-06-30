<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Modifier un Produit</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="name" label="Nom du produit" type="text" :modelValue="product.name"
                    @update:modelValue="product.name = $event" required />
                <FormTextarea id="description" label="Description" :modelValue="product.description"
                    @update:modelValue="product.description = $event" required />
                <FormInput id="price" label="Prix" type="number" :modelValue="product.price"
                    @update:modelValue="product.price = $event" required />
                <FormInput id="stock" label="Stock" type="number" :modelValue="product.stock"
                    @update:modelValue="product.stock = $event" required />
                <FormInput id="category" label="Catégorie" type="text" :modelValue="product.category"
                    @update:modelValue="product.category = $event" required />
                <FormFileInput id="image" label="Image" :modelValue="product.image"
                    @update:modelValue="product.image = $event" required />
                <div class="text-right">
                    <button type="submit"
                        class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import FormInput from '../formComponents/admin/FormInput.vue';
import FormTextarea from '../formComponents/admin/FormTextarea.vue';
import FormFileInput from '../formComponents/admin/FormFileInput.vue';

const router = useRouter();
const route = useRoute();

const product = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: null
});

onMounted(() => {
    const productId = route.params.id;
    // Fetch the product data using the productId
    // This is a placeholder. Replace it with your actual data fetching logic.
    fetchProductData(productId);
});

const fetchProductData = (productId) => {
    // Placeholder function to simulate fetching product data from an API
    // Replace this with your actual API call
    const fetchedProduct = {
        id: productId,
        name: 'Produit Exemple',
        description: 'Ceci est un produit exemple',
        price: 100,
        stock: 10,
        category: 'Catégorie Exemple',
        image: null // Replace with actual image data if available
    };
    product.value = fetchedProduct;
};

const submitForm = () => {
    console.log('Product updated:', product.value);
    // Ajouter la logique pour mettre à jour le produit
    router.push({ name: 'ProductList' });
};
</script>

<style scoped>/* Ajoutez des styles supplémentaires si nécessaire */</style>
