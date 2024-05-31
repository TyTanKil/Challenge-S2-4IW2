<script setup lang='ts'>
  import AppButtonPrimary from '../formComponents/AppButtonPrimary.vue'
  import AppButtonSecondary from '../formComponents/AppButtonSecondary.vue';
  import AppInputText from '../formComponents/AppInputText.vue';
  import AppInputCheckbox from '../formComponents/AppInputCheckbox.vue';
  import AppInputSelect from '../formComponents/AppInputSelect.vue';

  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const handleLogin = () => {
    // Logique de connexion
    console.log('Email:', email.value);
    console.log('Password:', password.value);
  };
</script>

<template>
    <div class="newAccount-page">
      <p>Pour commander et accéder à nos différents services, nous vous convions à créer un compte client. C’est simple, rapide et il vous apportera de nombreux avantages.</p>
      <div class="btnNewAccount">
        <AppButtonSecondary label="Créer votre compte" link="/create"></AppButtonSecondary>
      </div>
    </div>
  </template>
  
  <style scoped>

  .newAccount-page{
    width: 80%;
    margin: auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    h1{
        text-align: center;
        font-weight: 400;
    }
    p{
        width:80%;
        margin: auto;
        color: #00000054;
    }
    .btnNewAccount{
        width: 80%;
        margin: auto;
    }
  }
  
  </style>
  