<template>
    <div class="bouttons">
      <button @click="sendAccountConfirmationEmail">Confirmer la création de compte</button>
      <button @click="sendBirthdayEmail">Envoyer un mail d'anniversaire</button>
      <button @click="sendAbandonedCartEmail">Rappeler panier abandonné</button>
      <button @click="sendResetPasswordEmail">Changer de Mdp</button>
      <button @click="sendPaymentConfirmationEmail">Confirmer le paiement</button>
      <button @click="sendOrderConfirmationEmail">Confirmer la commande</button>
      <button @click="sendShippingConfirmationEmail">Confirmer l'envoi</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      async sendOrderConfirmationEmail() {
        const emailData = {
          type: 'confirmation',
          to: 'client@example.com',
          data: {
            productName: 'Produit 1',
            quantity: 1,
            price: 20.00,
            orderNumber: '12345'
          }
        };
  
        try {
          const response = await axios.post('http://localhost:3001/send-email', emailData);
          console.log('Email envoyé:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
      },
      async sendResetPasswordEmail() {
        const emailData = {
          type: 'reset-password',
          to: 'client@example.com',
          data: {
            token: 'abcdef123456' // Assurez-vous de générer un token réel
          }
        };
  
        try {
          const response = await axios.post('http://localhost:3001/send-email', emailData);
          console.log('Email envoyé:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
      },
      async sendShippingConfirmationEmail() {
        const emailData = {
          type: 'shipping-notification',
          to: 'client@example.com',
          data: {
            orderNumber: '12345'
          }
        };
  
        try {
          const response = await axios.post('http://localhost:3001/send-email', emailData);
          console.log('Email envoyé:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
      },
      async sendBirthdayEmail() {
        const emailData = {
          type: 'birthday',
          to: 'client@example.com',
          data: {
            name: 'Client'
          }
        };
  
        try {
          const response = await axios.post('http://localhost:3001/send-email', emailData);
          console.log('Email envoyé:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
      },
      async sendAccountConfirmationEmail() {
        const emailData = {
          type: 'account-confirmation',
          to: 'client@example.com',
          data: {
            name: 'Client'
          }
        };
  
        try {
          const response = await axios.post('http://localhost:3001/send-email', emailData);
          console.log('Email envoyé:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
      },
      async sendAbandonedCartEmail() {
        const emailData = {
          type: 'abandoned-cart',
          to: 'client@example.com',
          data: {
            name: 'Client',
            items: [
              { name: 'Produit 1', price: 10.00 },
              { name: 'Produit 2', price: 15.00 }
            ]
          }
        };
  
        try {
          const response = await axios.post('http://localhost:3001/send-email', emailData);
          console.log('Email envoyé:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
      },
      async sendPaymentConfirmationEmail() {
        const emailData = {
          type: 'payment-confirmation',
          to: 'client@example.com',
          data: {
            name: 'Client',
            orderNumber: '12345'
          }
        };
  
        try {
          const response = await axios.post('http://localhost:3001/send-email', emailData);
          console.log('Email envoyé:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
      }
    }
  };
  </script>
  
<style scoped>
.bouttons{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 20%;
    button{
        padding: 1rem;
        &:hover{
            cursor: pointer;
        }
    }
}
</style>