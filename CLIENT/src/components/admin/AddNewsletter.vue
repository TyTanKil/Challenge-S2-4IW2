<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8">Ajouter un Produit</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="object" label="Objet du mail" type="text" :modelValue="email.object"
                    @update:modelValue="email.object = $event" required class="mb-4" />
                <FormTextarea id="content" label="Contenu du mail" :modelValue="email.content"
                    @update:modelValue="email.content = $event" required class="mb-4" />
                <FormDate id="date" label="Date d'envoi" :modelValue="email.date" :datemin="tomorrow"
                         @update:modelValue="email.date = $event" required class="mb-4" />
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
const email = ref({
    date: '',
    object: '',
    content: '',
});

const submitForm = async () => {
    const formData = new FormData();
    formData.append('date', email.value.date);
    formData.append('object', email.value.object);
    formData.append('content', email.value.content);

    try {
        await ApiClient.post('/newsletter', {
            date: email.value.date,
            object: email.value.object,
            content: email.value.content,
        });
        router.push({ name: 'NewsletterList' });
        toast.success('Email ajouté avec succès');
    } catch (error) {
        console.error('Error adding email:', error);
        toast.error('Erreur lors de l\'ajout du produit');
    }
};
</script>

<style scoped>
</style>
