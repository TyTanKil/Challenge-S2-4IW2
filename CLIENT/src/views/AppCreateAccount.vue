<script setup lang="ts">
import { ref } from 'vue';
import AppButtonSecondary from '../components/formComponents/AppButtonSecondary.vue';
import AppInputText from '../components/formComponents/AppInputText.vue';
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

const emailError = ref('');
const passwordError = ref('');
const lastNameError = ref('');
const firstNameError = ref('');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;

const validateEmail = () => {
  if (!emailRegex.test(email.value)) {
    emailError.value = "Veuillez entrer une adresse email valide.";
    return false;
  }
  emailError.value = '';
  return true;
};

const validatePassword = () => {
  if (!passwordRegex.test(password.value)) {
    passwordError.value = "Le mot de passe doit contenir au moins 12 caractères, avec des lettres majuscules, minuscules, des chiffres et des symboles.";
    return false;
  }
  passwordError.value = '';
  return true;
};

const validateFirstName = () => {
  if (firstName.value.length < 1) {
    firstNameError.value = "Veuillez renseigner un prénom.";
    return false;
    }
    firstNameError.value = "";
    return true;
}

const validateLastName = () => {
  if (lastName.value.length < 1) {
    lastNameError.value = "Veuillez renseigner un nom.";
    return false;
    }
    lastNameError.value = "";
    return true;
}

const handleCreate = () => {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();

  if (isEmailValid && isPasswordValid && isFirstNameValid && isLastNameValid) {
    console.log('Inscription');
    console.log('Adresse Email:', email.value);
    console.log('Mot de passe:', password.value);
    console.log('Prénom:', firstName.value);
    console.log('Nom:', lastName.value);
    console.log('Civilité:', gender.value);
    console.log('Pays:', country.value);
    console.log('Date de naissance:', birthDate.value);
  }
};
</script>

<template>
  <div class="create-page">
    <h1>Créez votre compte</h1>
    <form @submit.prevent="handleCreate">
      <div class="identifiers">
        <h2>Identifiants</h2>
        <AppInputText v-model="email" label="Adresse Email" isNeeded></AppInputText>
        <span v-if="emailError" class="error">{{ emailError }}</span>
        <AppInputText v-model="password" label="Mot de passe" isNeeded hideContent></AppInputText>
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>
      <div class="personal_info">
        <h2>Informations personnelles</h2>
        <AppInputText v-model="firstName" label="Prénom" isNeeded></AppInputText>
        <span v-if="firstNameError" class="error">{{ firstNameError }}</span>
        <AppInputText v-model="lastName" label="Nom" isNeeded></AppInputText>
        <span v-if="lastNameError" class="error">{{ lastNameError }}</span>
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
  margin: 3rem auto;
  width: 50%;
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

.error {
  color: red;
  font-size: 0.8rem;
}
</style>
