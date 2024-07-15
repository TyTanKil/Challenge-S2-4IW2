<template>
    <div class="success-page">
      <h1>Achat Réussi !</h1>
      <p>Merci pour votre achat. Votre commande a été passée avec succès.</p>
      <p>Vous allez recevoir un email de confirmation contenant la facture de votre achat.</p>
      <p>Si vous avez des questions, n'hésitez pas à nous contacter à support@tech-shop.tech.</p>
      <router-link to="/">Retour à l'accueil</router-link>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const orderDetails = ref(null);
      const errorMessage = ref(null);
  
      const fetchOrderDetails = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
  
        if (!sessionId) {
          errorMessage.value = "Session de paiement invalide.";
          return;
        }
  
        try {
          const response = await axios.get(`http://localhost:3000/orders/${sessionId}`);
          orderDetails.value = response.data;
        } catch (error) {
          errorMessage.value = "Erreur lors de la récupération des détails de la commande.";
        }
      };
  
      onMounted(fetchOrderDetails);
  
      return {
        orderDetails,
        errorMessage,
      };
    },
  };
  </script>
  
  <style>
  .success-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .success-page h1 {
    color: #A0DB10;
  }
  
  .success-page p {
    margin: 10px 0;
  }
  
  .success-page a {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    color: #000;
    background-color: #A0DB10;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .success-page a:hover {
    background-color: #C4F649;
  }
  </style>
  