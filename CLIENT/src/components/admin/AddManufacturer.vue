<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8 color-dark">Ajouter un Fabricant</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="label" label="Nom du fabricant" type="text" :modelValue="manufacturer.label"
                    @update:modelValue="manufacturer.label = $event" required class="mb-4" />
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
import { useToast } from 'vue-toast-notification';
import ApiClient from '../../assets/js/apiClient';

const router = useRouter();
const manufacturer = ref({
    label: ''
});
const toast = useToast();


const submitForm = async () => {
    try {
        await ApiClient.post('/manufacturer', manufacturer.value);
        router.push({ name: 'ManufacturerList' }); 
        toast.success('Fabricant ajouté avec succès');
    } catch (error) {
        console.error('Error adding manufacturer:', error);
        toast.error('Erreur lors de l\'ajout de fabricant');
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
