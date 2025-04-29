<template>
  <div>
    <div class="chart-container">
      <h2 class="chart-title">Évolution des stocks (par mois - Année en cours)</h2>
      <div class="chart-card">
        <canvas id="stockEvolutionChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';
import ApiClient from '@/assets/js/apiClient';

async function fetchStockEvolution() {
  try {
    const response = await ApiClient.get('/stock-history');
    const groupedData = groupDataByMonth(response);
    initializeStockChart(groupedData);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l’évolution des stocks:', error);
  }
}

// Fonction pour regrouper les quantités par mois pour l'année en cours
function groupDataByMonth(data) {
  const groupedData = {};
  const currentYear = new Date().getFullYear();
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  // Initialiser chaque mois avec une quantité de zéro
  monthNames.forEach((month) => {
    groupedData[month] = 0;
  });

  // Ajouter les quantités pour les mois où il y a des données
  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // Utilisez le mois comme index pour récupérer le nom

    // Filtre pour ne conserver que l'année en cours
    if (year === currentYear) {
      const monthName = monthNames[monthIndex];
      groupedData[monthName] += item.quantity;
    }
  });

  // Obtenir les labels et les quantités dans l'ordre des mois
  const labels = monthNames;
  const quantities = monthNames.map(month => groupedData[month]);

  return { labels, quantities };
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
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Quantité',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Mois',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  });
}

onMounted(() => {
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
