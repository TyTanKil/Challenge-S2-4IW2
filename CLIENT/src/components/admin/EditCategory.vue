<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Modifier une Catégorie</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="label" label="Nom de la catégorie" type="text" :modelValue="category.label"
                    @update:modelValue="category.label = $event" required class="mb-4" />
                <div class="flex justify-between items-center">
                    <button type="submit"
                        class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Enregistrer
                    </button>
                    <button type="button" @click="confirmDelete"
                        class="btn-red hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
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
import { useToast } from 'vue-toast-notification';
import FormInput from '../formComponents/admin/FormInput.vue';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const category = ref({
    label: ''
});

onMounted(async () => {
    const categoryId = route.params.id;
    try {
        const response = await axios.get(`/category/${categoryId}`);
        category.value = response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
    }
});

const submitForm = async () => {
    const categoryId = route.params.id;
    try {
        await axios.put(`/category/${categoryId}`, category.value);
        toast.success('Catégorie modifiée avec succès');
        router.push({ name: 'CategoryList' });
    } catch (error) {
        console.error('Error updating category:', error);
        toast.error('Erreur lors de la modification de la catégorie');
    }
};

const confirmDelete = () => {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
        deleteCategory();
    }
};

const deleteCategory = async () => {
    const categoryId = route.params.id;
    try {
        await axios.delete(`/category/${categoryId}`);
        toast.success('Catégorie supprimée avec succès');
        router.push({ name: 'CategoryList' });
    } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Erreur lors de la suppression de la catégorie');
    }
};
</script>
