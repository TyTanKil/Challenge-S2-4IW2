<script setup>
  import {ref} from "vue";
  import AppInputText from "@/components/formComponents/AppInputText.vue";
  import ApiClient from "@/assets/js/apiClient.js";
  import {useToast} from "vue-toast-notification";
  import AppButtonSecondary from "@/components/formComponents/AppButtonSecondary.vue";
  import AppInputTextArea from "@/components/formComponents/AppInputTextArea.vue";

  const last_name = ref('');
  const first_name = ref('');
  const email = ref('');
  const demande = ref('');

  const toast = useToast();

  const sendMail = async () => {
    try {
      await ApiClient.post('/send-email', {
        type: "contact-support",
        data: {
          last_name: last_name.value,
          first_name: first_name.value,
          from: email.value,
          demande: demande.value
        }
      });
      toast.success( 'Votre demande a bien été envoyée')
    } catch (error) {
      toast.error('Votre mail n\'a pas pu être envoyé');
    }
  };
</script>

<template>
  <div class="title">
    <h1>Formulaire de contact</h1>

    <p>Vous avez la moindre question ? Contactez-nous via le formulaire ci-dessous</p>
  </div>

  <div class="login-page">
    <form @submit.prevent="sendMail">
      <AppInputText label="Nom" v-model="last_name" isNeeded></AppInputText>
      <AppInputText label="Prenom" v-model="first_name" isNeeded></AppInputText>
      <AppInputText label="Email" v-model="email" placeholder="test@mail.com" isNeeded></AppInputText>
      <AppInputTextArea label="Demande" v-model="demande" lines="5" isNeeded></AppInputTextArea>
      <AppButtonSecondary label="Envoyer"></AppButtonSecondary>
    </form>
  </div>
</template>

<style scoped>
  .title {
    text-align: center;
  }

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