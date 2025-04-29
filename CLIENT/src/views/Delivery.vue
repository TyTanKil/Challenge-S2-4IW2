<!-- filepath: CLIENT/src/views/Delivery.vue -->
<template>
    <div v-if="delivery">
      <h1>Livraison ID: {{ delivery.id }}</h1>
      <p>État: {{ delivery.status }}</p>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </template>
  
  <script>
  import apiClient from "../assets/js/apiClient";
  
  export default {
    name: "Delivery",
    props: {
      deliveryId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        delivery: null,
      };
    },
    methods: {
      async fetchDelivery() {
        try {
          const data = await apiClient.getDelivery(this.deliveryId);
          this.delivery = data;
        } catch (error) {
          console.error("Erreur lors de la récupération de la livraison :", error);
        }
      },
    },
    mounted() {
      this.fetchDelivery();
      this.interval = setInterval(this.fetchDelivery, 10000); // Mise à jour toutes les 10 secondes
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici si nécessaire */
  </style>