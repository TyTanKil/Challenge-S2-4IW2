<template>
    <div class="row">
      <div class="email-input">
        <h2>Entrez l'adresse e-mail</h2>
        <input v-model="email" type="email" placeholder="example@domain.com" />
      </div>
      <div class="bouttons">
        <h1>Test Emails</h1>
        <button @click="sendEmail('confirmation')">Send Confirmation Email</button>
        <button @click="sendEmail('reset-password')">Send Reset Password Email</button>
        <button @click="sendEmail('shipping-notification')">Send Shipping Notification Email</button>
        <button @click="sendEmail('birthday')">Send Birthday Email</button>
        <button @click="sendEmail('account-confirmation')">Send Account Confirmation Email</button>
        <button @click="sendEmail('abandoned-cart')">Send Abandoned Cart Email</button>
        <button @click="sendEmail('payment-confirmation')">Send Payment Confirmation Email</button>
      </div>
      <div class="bouttons">
        <h1>Test Emails</h1>
        <button @click="sendEmail('new-product')">Send New Product Email</button>
        <button @click="sendEmail('restock')">Send Restock Email</button>
        <button @click="sendEmail('price-change')">Send Price Change Email</button>
        <button @click="sendEmail('newsletter-signup')">Send Newsletter Signup Email</button>
      </div>
    </div>
  </template>
  
  <script>
  import ApiClient from "@/assets/js/apiClient.js";

  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      async sendEmail(type) {
        const data = {
          confirmation: {
            type: 'confirmation',
            to: this.email,
            data: {
              productName: 'Produit 1',
              items: [
                { name: 'Produit 1', quantity: 2, price: 100 },
                { name: 'Produit 2', quantity: 2, price: 200 }
              ]
            }
          },
          'reset-password': {
            type: 'reset-password',
            to: this.email,
            data: {
              token: 'abcd1234'
            }
          },
          'shipping-notification': {
            type: 'shipping-notification',
            to: this.email,
            data: {
              orderNumber: '12345'
            }
          },
          birthday: {
            type: 'birthday',
            to: this.email,
            data: {
              name: 'John Doe'
            }
          },
          'account-confirmation': {
            type: 'account-confirmation',
            to: this.email,
            data: {
              name: 'John Doe'
            }
          },
          'abandoned-cart': {
            type: 'abandoned-cart',
            to: this.email,
            data: {
              name: 'John Doe',
              items: [
                { name: 'Produit 1', price: 100 },
                { name: 'Produit 2', price: 200 }
              ]
            }
          },
          'payment-confirmation': {
            type: 'payment-confirmation',
            to: this.email,
            data: {
              name: 'John Doe',
              orderNumber: '12345',
              items: [
                { name: 'Produit 1', price: 100 },
                { name: 'Produit 2', price: 200 }
              ]
            }
          },
          'new-product': {
            type: 'new-product',
            to: this.email,
            data: {
              categoryName: 'Catégorie 1',
              userName: 'John Doe',
              productName: 'Nouveau Produit',
              price: 150
            }
          },
          restock: {
            type: 'restock',
            to: this.email,
            data: {
              userName: 'John Doe',
              productName: 'Produit Restock'
            }
          },
          'price-change': {
            type: 'price-change',
            to: this.email,
            data: {
              userName: 'John Doe',
              productName: 'Produit 1',
              newPrice: 120
            }
          },
          'newsletter-signup': {
            type: 'newsletter-signup',
            to: this.email,
            data: {
              userName: 'John Doe'
            }
          }
        };
  
        try {
          await ApiClient.post('/send-email', JSON.stringify(data));
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .row {
    display: flex;
    gap: 2rem;
  }
  .email-input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .email-input input {
    padding: 0.5rem;
    font-size: 1rem;
  }
  .bouttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 20%;
  }
  button {
    padding: 1rem;
  }
  button:hover {
    cursor: pointer;
  }
  </style>
  