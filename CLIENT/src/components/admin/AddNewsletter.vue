<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Ajouter un Produit</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="object" label="Objet du mail" type="text" :modelValue="product.object"
                    @update:modelValue="product.object = $event" required class="mb-4" />
                <FormInput id="content" label="Contenu du mail" type="text" :modelValue="product.content"
                    @update:modelValue="product.content = $event" required class="mb-4" />
                <FormDate id="date" label="Date d'envoi" :modelValue="product.date" :datemin="tomorrow"
                         @update:modelValue="product.date = $event" required class="mb-4" />
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
import FormDate from "@/components/formComponents/admin/FormDate.vue";

let d = new Date();
d.setDate(d.getDate() + 1);
let tomorrow = d.toLocaleDateString('en-CA');

const toast = useToast();
const router = useRouter();
const product = ref({
    date: '',
    object: '',
    content: '',
});

const submitForm = async () => {
    const formData = new FormData();
    formData.append('date', product.value.date);
    formData.append('object', product.value.object);
    formData.append('content', product.value.content);

    try {
        /*await ApiClient.post('/newsletter', formData);
        router.push({ name: 'NewsletterList' });
        toast.success('Email ajouté avec succès');*/
    } catch (error) {
        console.error('Error adding email:', error);
        toast.error('Erreur lors de l\'ajout du produit');
    }
};
</script>

<style scoped>
</style>
