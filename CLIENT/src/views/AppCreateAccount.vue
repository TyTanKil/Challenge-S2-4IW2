<script setup lang="ts">
import { ref } from 'vue';
import AppButtonSecondary from '@/components/formComponents/AppButtonSecondary.vue';
import AppInputText from '@/components/formComponents/AppInputText.vue';
import AppInputDate from '@/components/formComponents/AppInputDate.vue';
import AppInputRadio from '@/components/formComponents/AppInputRadio.vue';
import { useToast } from 'vue-toast-notification';
import ApiClient from '@/assets/js/apiClient';

const email = ref('');
const password = ref('');
const phone = ref('');
const firstName = ref('');
const lastName = ref('');
const gender = ref('');
const birthDate = ref('');

const emailError = ref('');
const passwordError = ref('');
const phoneError = ref('');
const lastNameError = ref('');
const firstNameError = ref('');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
const phoneRegex = /^(?:(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}|\d{10})$/;

const toast = useToast();

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
    passwordError.value = "Le mot de passe doit contenir au moins 12 caractères et des lettres majuscules, minuscules, des chiffres et des symboles.";
    return false;
  }
  passwordError.value = '';
  return true;
};

const validatePhone = () => {
  if (phone.value && !phoneRegex.test(phone.value)) {
    phoneError.value = "Le format du numéro de téléphone n'est pas bon";
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

const handleCreate = async () => {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isPhoneValid = validatePhone();
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();

  if ( isEmailValid && isPasswordValid && isPhoneValid && isFirstNameValid && isLastNameValid ) {
    try {
      await ApiClient.post( "/user", {
        "firstName": firstName.value,
        "lastName": lastName.value,
        "gender": gender.value,
        "email": email.value,
        "password": password.value,
        "phone": phone.value,
        "birth_date": birthDate.value
      } );

      toast.success(`Compte crée : vous avez reçu un email de confirmation. Veuillez vérifier votre boîte de réception.`);
    } catch ( error ) {
      switch ( error.response.status ) {
        case 409:
          toast.error( `Impossible de créer le compte - le champ ${error.response.data.field} n'est pas unique` );
          break;
        default:
          toast.error( 'Impossible de créer le compte - veuillez contacter l\'assistance' );
          break;
      }
    }
  }
};
</script>

<template>
  <div class="create-page">
    <h1>Créez votre compte</h1>
    <form @submit.prevent="handleCreate">
      <div class="identifiers">
        <h2>Identifiants</h2>
        <AppInputText v-model="email" label="Adresse Email" isNeeded placeholder="example@mail.com"></AppInputText>
        <span v-if="emailError" class="error">{{ emailError }}</span>
        <AppInputText v-model="password" label="Mot de passe" isNeeded hideContent placeholder="Password123"></AppInputText>
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
        <AppInputText v-model="phone" label="Numéro de telephone" placeholder="0344252525"></AppInputText>
        <span v-if="phoneError" class="error">{{ phoneError }}</span>
      </div>
      <div class="personal_info">
        <h2>Informations personnelles</h2>
        <AppInputText v-model="firstName" label="Prénom" isNeeded placeholder="Prénom"></AppInputText>
        <span v-if="firstNameError" class="error">{{ firstNameError }}</span>
        <AppInputText v-model="lastName" label="Nom" isNeeded placeholder="Nom"></AppInputText>
        <span v-if="lastNameError" class="error">{{ lastNameError }}</span>
        <AppInputRadio v-model="gender" label="Civilité" :options="[{value: 'm', label: 'M.'}, {value: 'f', label: 'Mme.'}, {value: 'a', label: 'Autre'}]"></AppInputRadio>
        <AppInputDate v-model="birthDate" label="Date de naissance" isNeeded></AppInputDate>
      </div>
      <AppButtonSecondary label="Valider"></AppButtonSecondary>
    </form>
  </div>
</template>

<style scoped>
.create-page {
  margin: 3rem auto;
  width: 80%;
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
  div.identifiers, div.personal_info, div.button-secondary{
    margin: 0.7rem auto;
    width: 80%;
    div.inputText, div.inputSelect, div.inputDate{
      width: 100%;
    }
  }
}

.error {
  color: red;
  font-size: 0.8rem;
}
</style>