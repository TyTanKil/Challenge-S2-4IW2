<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Ajouter un Produit</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6" novalidate>
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
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '../formComponents/admin/FormInput.vue';
import FormTextarea from '../formComponents/admin/FormTextarea.vue';
import FormFileInput from '../formComponents/admin/FormFileInput.vue';

const router = useRouter();

const product = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: null
});

const submitForm = () => {
    console.log('Product added:', product.value);
    // Ajouter la logique pour ajouter le produit
    router.push({ name: 'ProductList' });
};
</script>

<style scoped>/* Ajoutez des styles supplémentaires si nécessaire */</style>
