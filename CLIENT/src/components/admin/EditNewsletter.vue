<template>
  <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
    <div class="w-full max-w-lg">
      <h1 class="text-2xl font-bold mb-8">Modifier un email de la newsletter</h1>
      <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
        <FormInput
            id="object"
            label="Objet du mail"
            required
            :modelValue="email.object"
            @update:modelValue="email.object = $event"
        />
        <FormStylisedInput
            id="content"
            label="Contenu du mail"
            toolbar="full"
            required
        />
        <FormDate id="date" label="Date d'envoi" :modelValue="email.date" :datemin="tomorrow"  v-model="email.date"/>
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
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useToast} from 'vue-toast-notification';
import ApiClient from '../../assets/js/apiClient';
import FormDate from "@/components/formComponents/admin/FormDate.vue";
import FormStylisedInput from '../formComponents/admin/FormStylisedInput.vue';
import FormInput from '../formComponents/admin/FormInput.vue';
import FormInput from '../formComponents/admin/FormInput.vue';
import ApiClient from '../../assets/js/apiClient';
import FormDate from "@/components/formComponents/admin/FormDate.vue";
import FormStylisedInput from '../formComponents/admin/FormStylisedInput.vue';
import FormInput from '../formComponents/admin/FormInput.vue';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const email = ref({
  date: '',
  object: '',
  content: '',
});

onMounted(async () => {
  const emailId = route.params.id;
  try {
    email.value = await ApiClient.get(`/newsletter/${emailId}`);
    document.querySelector('#content .ql-editor').innerHTML = email.value.content;
  } catch (error) {
    console.error('Error fetching email:', error);
  }
});

const submitForm = async () => {
  const emailId = route.params.id;

  email.value.content = document.querySelector('#content .ql-editor').innerHTML;

  try {
    await ApiClient.put(`/newsletter/${emailId}`, email.value);
    toast.success('Email modifié avec succès');
    router.push({name: 'NewsletterList'});
  } catch (error) {
    console.error('Error updating email:', error);
    toast.error('Erreur lors de la modification de l\'email');
  }
};

const confirmDelete = () => {
  if (confirm('Voulez-vous vraiment supprimer cet email ?')) {
    deleteEmail();
  }
};

const deleteEmail = async () => {
  const emailId = route.params.id;
  try {
    await ApiClient.delete(`/newsletter/${emailId}`);
    toast.success('Email supprimé avec succès');
    router.push({name: 'NewsletterList'});
  } catch (error) {
    console.error('Error deleting email:', error);
    toast.error('Erreur lors de la suppression de l\'email');
  }
};
</script>
