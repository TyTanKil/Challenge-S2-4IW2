<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Ajouter une Catégorie</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="label" label="Nom de la catégorie" type="text" :modelValue="category.label"
                    @update:modelValue="category.label = $event" required class="mb-4" />
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
import axios from '../../axios';
import FormInput from '../formComponents/admin/FormInput.vue';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const category = ref({
    label: ''
});
const toast = useToast();


const submitForm = async () => {
    try {
        await axios.post('/category', category.value);
        router.push({ name: 'CategoryList' }); // Assurez-vous que cette route existe
        toast.success('Catégorie ajouté avec succès');

    } catch (error) {
        console.error('Error adding category:', error);
        toast.error('Erreur lors de l\'ajout de catégorie');
    }
};
</script>

<style scoped></style>
