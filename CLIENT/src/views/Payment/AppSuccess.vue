<template>
    <div class="success-page">
      <h1>Payment Successful!</h1>
      <p>Your payment was processed successfully.</p>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
  
      onMounted(async () => {
        const sessionId = route.query.session_id;
        if (sessionId) {
          try {
            const response = await fetch(`http://localhost:3000/orders/${sessionId}`);
            const data = await response.json();
  
            if (data.error) {
              console.error(data.error);
            } else {
              console.log('Order details:', data);
            }
          } catch (error) {
            console.error('Error fetching order details:', error);
          }
        }
      });
    },
  };
  </script>
  