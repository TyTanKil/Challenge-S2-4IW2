<template>
    <div class="chart-container">
      <h2 class="chart-title">Évolution des stocks pour le produit {{ productName }}</h2>
      <div class="chart-card">
        <canvas id="stockEvolutionChart"></canvas>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Chart from 'chart.js/auto';
  import ApiClient from '@/assets/js/apiClient';
  
  const route = useRoute();
  const id = route.params.id;
  const productName = ref(''); // Nom du produit

  

  // Fonction pour récupérer le nom du produit
async function fetchProductName() {
  try {
    const response = await ApiClient.get(`/products/show/${id}`); // Assurez-vous que l'API retourne les détails du produit
    console.log(response);
    productName.value = response.label || 'Nom inconnu'; // Utilisez une valeur par défaut en cas d'absence
  } catch (error) {
    console.error('Erreur lors de la récupération du nom du produit:', error);
    productName.value = 'Nom inconnu';
  }
}


  async function fetchStockEvolution() {
    try {
      const response = await ApiClient.post('/stock-history/product', { id });
      const groupedData = groupDataByMonth(response.data);
      initializeStockChart(groupedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
  
  function groupDataByMonth(data) {
    const groupedData = {};
    const currentYear = new Date().getFullYear();
    const monthNames = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
  
    monthNames.forEach((month) => {
      groupedData[month] = 0;
    });
  
    data.forEach((item) => {
      const date = new Date(item.createdAt);
      if (date.getFullYear() === currentYear) {
        const monthName = monthNames[date.getMonth()];
        groupedData[monthName] += item.quantity;
      }
    });
  
    return {
      labels: monthNames,
      quantities: monthNames.map((month) => groupedData[month]),
    };
  }
  
  function initializeStockChart(groupedData) {
    const ctx = (document.getElementById('stockEvolutionChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: groupedData.labels,
        datasets: [
          {
            label: 'Quantité en Stock',
            data: groupedData.quantities,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
          x: { title: { display: true, text: 'Mois' } },
        },
      },
    });
  }
  
  onMounted(() => {
    fetchProductName();
    fetchStockEvolution();
  });
  </script>
<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  
}

.chart-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.chart-card {
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

canvas {
  max-width: 100%;
  height: auto;
}
</style>

  