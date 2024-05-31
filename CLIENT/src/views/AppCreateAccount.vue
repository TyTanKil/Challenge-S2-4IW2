<script setup lang="ts">
import { ref } from 'vue';
import AppButtonPrimary from '../components/formComponents/AppButtonPrimary.vue';
import AppButtonSecondary from '../components/formComponents/AppButtonSecondary.vue';
import AppInputText from '../components/formComponents/AppInputText.vue';
import AppInputCheckbox from '../components/formComponents/AppInputCheckbox.vue';
import AppInputSelect from '../components/formComponents/AppInputSelect.vue';
import AppInputDate from '@/components/formComponents/AppInputDate.vue';
import AppInputRadio from '@/components/formComponents/AppInputRadio.vue';

const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const gender = ref('');
const country = ref('');
const birthDate = ref('');

const handleCreate = () => {
  console.log('Inscription');
  console.log('Adresse Email:', email.value);
  console.log('Mot de passe:', password.value);
  console.log('Prénom:', firstName.value);
  console.log('Nom:', lastName.value);
  console.log('Civilité:', gender.value);
  console.log('Pays:', country.value);
  console.log('Date de naissance:', birthDate.value);
};
</script>

<template>
  <div class="create-page">
    <h1>Créez votre compte</h1>
    <form @submit.prevent="handleCreate">
      <div class="identifiers">
        <h2>Identifiants</h2>
        <AppInputText v-model="email" label="Adresse Email" isNeeded></AppInputText>
        <AppInputText v-model="password" label="Mot de passe" isNeeded hideContent></AppInputText>
      </div>
      <div class="personal_info">
        <h2>Informations personnelles</h2>
        <AppInputText v-model="firstName" label="Prénom" isNeeded></AppInputText>
        <AppInputText v-model="lastName" label="Nom" isNeeded></AppInputText>
        <AppInputRadio v-model="gender" label="Civilité" :options="['M.', 'Mme.', 'Autre']"></AppInputRadio>
        <AppInputSelect v-model="country" label="Pays" :options="['France (métropolitaine)', 'France (outre-mer)', 'Allemagne', 'Belgique', 'Suisse', 'Italie', 'Espagne', 'Royaume-Uni', 'Autre']" isNeeded></AppInputSelect>
        <AppInputDate v-model="birthDate" label="Date de naissance" isNeeded></AppInputDate>
      </div>
      <AppButtonSecondary label="Valider"></AppButtonSecondary>
    </form>
  </div>
</template>

<style scoped>
.create-page {
  margin-top: 2rem;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
}

h1 {
  text-align: center;
  font-weight: 400;
}

h2 {
  font-weight: 500;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
