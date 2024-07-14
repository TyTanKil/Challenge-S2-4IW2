<script setup lang='ts'>
  import AppButtonSecondary from '../formComponents/AppButtonSecondary.vue';
  import AppInputText from '../formComponents/AppInputText.vue';
  import AppInputCheckbox from '../formComponents/AppInputCheckbox.vue';

  import { ref } from 'vue';
  import ApiClient from '@/assets/js/apiClient';

  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toast-notification';

  const store = useStore(); // Accéder au store Vuex
  const router = useRouter(); // Accéder au router

  const email = ref('');
  const password = ref('');

  const toast = useToast();

  const handleLogin = async () => {
    try {
      let response = await ApiClient.login(email.value, password.value);

      localStorage.setItem('jwtToken', response.data);
      store.commit('updateUser')

      if(false){
        //TODO : pas de redirect
        console.log("pas de redirect");
      }else{
        window.location.href = '/';
      }
    } catch (error) {
      switch ( error.response.status ) {
        case 401:
          toast.error( `Informations de connexion incorrectes` );
          break;
        case 409:
          toast.error( `Veuillez valider votre compte avant de vous connecter` );
          break;
        default:
          toast.error( 'Impossible de vous connecter - veuillez contacter l\'assistance' );
          break;
      }
    }
  };
</script>

<template>
    <div class="login-page">
      <p>Connectez-vous avec votre adresse email et votre mot de passe pour accéder à votre espace client.</p>
      <form @submit.prevent="handleLogin">
        <AppInputText label="Email" v-model="email" placeholder="test@mail.com" isNeeded></AppInputText>
        <AppInputText label="Mot de passe" v-model="password" placeholder="123456789" isNeeded hideContent></AppInputText>
        <AppInputCheckbox label="Rester connecté ?"></AppInputCheckbox>
        <AppButtonSecondary  label="Connexion"></AppButtonSecondary>
      </form>
    </div>
  </template>
  
  <style scoped>

  .login-page{
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
        color: #575757;
    }
    .btnNewAccount{
        width: 80%;
        margin: auto;
    }
    @media (prefers-color-scheme: dark) {
        p{
          color: #fff;
        }
    }
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
  }
  
  </style>