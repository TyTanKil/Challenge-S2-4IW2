<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Modifier un Fabricant</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="label" label="Nom du fabricant" type="text" :modelValue="manufacturer.label"
                    @update:modelValue="manufacturer.label = $event" required class="mb-4" />
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
import { useToast } from 'vue-toastification';
import FormInput from '../formComponents/admin/FormInput.vue';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const manufacturer = ref({
    label: ''
});

onMounted(async () => {
    const manufacturerId = route.params.id;
    try {
        const response = await axios.get(`/manufacturer/${manufacturerId}`);
        manufacturer.value = response.data;
    } catch (error) {
        console.error('Error fetching manufacturer:', error);
    }
});

const submitForm = async () => {
    const manufacturerId = route.params.id;
    try {
        await axios.put(`/manufacturer/${manufacturerId}`, manufacturer.value);
        toast.success('Fabricant modifié avec succès');
        router.push({ name: 'ManufacturerList' });
    } catch (error) {
        console.error('Error updating manufacturer:', error);
        toast.error('Erreur lors de la modification du fabricant');
    }
};

const confirmDelete = () => {
    if (confirm('Voulez-vous vraiment supprimer ce fabricant ?')) {
        deleteManufacturer();
    }
};

const deleteManufacturer = async () => {
    const manufacturerId = route.params.id;
    try {
        await axios.delete(`/manufacturer/${manufacturerId}`);
        toast.success('Fabricant supprimé avec succès');
        router.push({ name: 'ManufacturerList' });
    } catch (error) {
        console.error('Error deleting manufacturer:', error);
        toast.error('Erreur lors de la suppression du fabricant');
    }
};
</script>
