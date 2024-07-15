<template>
    <div class="cancel-page">
      <h1>Paiement Annulé</h1>
      <p>Votre paiement a été annulé. Si vous avez des questions ou des préoccupations, veuillez nous contacter à support@tech-shop.tech</p>
      <router-link to="/">Retour à l'accueil</router-link>
      <router-link to="/cart">Revenir au panier</router-link>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Cancel',
  };
  </script>
  
  <style>
  .cancel-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .cancel-page h1 {
    color: #f44336;
  }
  
  .cancel-page p {
    margin: 10px 0;
  }
  
  .cancel-page a {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    color: #fff;
    background-color: #f44336;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .cancel-page a:hover {
    background-color: #e53935;
  }
  
  .cancel-page a:last-child {
    margin-left: 10px;
  }
  </style>
  