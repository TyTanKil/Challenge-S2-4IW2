<template>
    <div>
      <h1>Expédition et Suivi de Colis</h1>
      <button @click="createShipment">Créer un envoi</button>
      <button @click="trackShipment">Suivre un colis</button>
      <div v-if="shipmentData">
        <h2>Détails de l'envoi</h2>
        <pre>{{ shipmentData }}</pre>
      </div>
      <div v-if="trackingData">
        <h2>Détails de suivi</h2>
        <pre>{{ trackingData }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        shipmentData: null,
        trackingData: null
      };
    },
    methods: {
      async createShipment() {
        const shipmentDetails = {
          address_from: {
            name: "John Smith",
            street1: "215 Clayton St.",
            city: "San Francisco",
            state: "CA",
            zip: "94117",
            country: "US"
          },
          address_to: {
            name: "Jane Smith",
            street1: "964 Mission St",
            city: "San Francisco",
            state: "CA",
            zip: "94103",
            country: "US"
          },
          parcels: [{
            length: "5",
            width: "5",
            height: "5",
            distance_unit: "in",
            weight: "2",
            mass_unit: "lb"
          }],
          carrier_account: "204883381", 
          servicelevel_token: "fedex_home_delivery"
        };
  
        try {
          const response = await axios.post('http://localhost:3000/create-shipment', shipmentDetails);
          this.shipmentData = response.data;
        } catch (error) {
          console.error('Erreur lors de la création de l\'envoi:', error);
        }
      },
      async trackShipment() {
        const carrier = 'usps';
        const trackingNumber = 'YOUR_TRACKING_NUMBER'; // Remplacez par votre numéro de suivi
  
        try {
          const response = await axios.get(`http://localhost:3000/track-shipment/${carrier}/${trackingNumber}`);
          this.trackingData = response.data;
        } catch (error) {
          console.error('Erreur lors du suivi du colis:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajouter du style ici si nécessaire */
  </style>
  