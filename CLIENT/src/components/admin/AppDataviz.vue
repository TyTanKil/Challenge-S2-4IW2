<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import ApiClient from '@/assets/js/apiClient';

// Définir les données des états réactifs
const salesData = ref<number>(0);
const userCount = ref<number>(0);
const orderCount = ref<number>(0);

const fetchUserCount = async () => {
    try {
        const response = await ApiClient.get('/order/total-users');
        const data = response.totalUsers;
        if (isNaN(data)) {
            throw new Error("Invalid user count data received");
        }
        userCount.value = data;

    } catch (error) {
        console.error('Error fetching user count:', error);
    }
};


// Fonction pour récupérer les données de vente
const fetchSalesData = async () => {
    try {
        const response = await ApiClient.get('/order/total-sales');
        salesData.value = response.totalSales;
    } catch (error) {
        console.error('Error fetching sales data:', error);
    }
};

// Fonction pour récupérer le nombre total de commandes
const fetchOrderCount = async () => {
    try {
        const response = await ApiClient.get('/order/total-orders');
        orderCount.value = response.totalOrders;
    } catch (error) {
        console.error('Error fetching order count:', error);
    }
};

// Fonction pour récupérer les produits les plus vendus
// const fetchTopProducts = async () => {
//     try {
//         const response = await ApiClient.get('/api/topProducts');
//         topProducts.value = response.data.topProducts;
//         initializeCharts(response.data);
//     } catch (error) {
//         console.error('Error fetching top products:', error);
//     }
// };

onMounted(() => {
    fetchUserCount(),
        fetchSalesData(),
        fetchOrderCount();
});
const topProducts = ref<Array<{ name: string; sales: number }>>([
    { name: 'Product A', sales: 100 },
    { name: 'Product B', sales: 80 },
    { name: 'Product C', sales: 60 },
]);

onMounted(() => {
    // Graphique des ventes de produits
    const salesCtx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Product Sales',
                    data: [150, 200, 180, 220, 170, 250],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Graphique des revenus des ventes
    const revenueCtx = (document.getElementById('revenueChart') as HTMLCanvasElement).getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Sales Revenue',
                    data: [5000, 7000, 6000, 8000, 7500, 9000],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Revenue in USD'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
});
</script>

<template>
    <main class="p-6 bg-gray-100 min-h-screen ml-60 w-full">
        <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <!-- Widgets de KPI -->
            <div class="flex flex-col bg-white text-gray-700 shadow-md rounded-lg overflow-hidden">
                <div
                    class="bg-gradient-to-tr from-blue-600 to-blue-400 text-white absolute -mt-4 ml-4 rounded-full p-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        class="w-6 h-6">
                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                        <path fill-rule="evenodd"
                            d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                            clip-rule="evenodd"></path>
                        <path
                            d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z">
                        </path>
                    </svg>
                </div>
                <div class="p-6 text-right">
                    <p class="text-sm font-medium text-gray-600">CA d'aujourd'hui</p>
                    <h4 class="text-2xl font-semibold text-gray-900">{{ salesData }}</h4>
                </div>
                <div class="border-t border-gray-200 p-4">
                    <p class="text-base font-normal text-gray-600">
                        <strong class="text-green-500">+55%</strong>&nbsp;que la semaine dernière
                    </p>
                </div>
            </div>

            <div class="flex flex-col bg-white text-gray-700 shadow-md rounded-lg overflow-hidden">
                <div
                    class="bg-gradient-to-tr from-orange-600 to-orange-400 text-white absolute -mt-4 ml-4 rounded-full p-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        class="w-6 h-6">
                        <path
                            d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z">
                        </path>
                    </svg>
                </div>
                <div class="p-6 text-right">
                    <p class="text-sm font-medium text-gray-600">Revenue</p>
                    <h4 class="text-2xl font-semibold text-gray-900">{{ salesData }}</h4>
                </div>
                <div class="border-t border-gray-200 p-4">
                    <p class="text-base font-normal text-gray-600">
                        <strong class="text-green-500">+5%</strong>&nbsp;qu'hier
                    </p>
                </div>
            </div>

            <div class="flex flex-col bg-white text-gray-700 shadow-md rounded-lg overflow-hidden">
                <div
                    class="bg-gradient-to-tr from-green-600 to-green-400 text-white absolute -mt-4 ml-4 rounded-full p-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        class="w-6 h-6">
                        <path
                            d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                        </path>
                    </svg>
                </div>
                <div class="p-6 text-right">
                    <p class="text-sm font-medium text-gray-600">Nouveaux Clients</p>
                    <h4 class="text-2xl font-semibold text-gray-900">{{ userCount }}</h4>
                </div>
                <div class="border-t border-gray-200 p-4">
                    <p class="text-base font-normal text-gray-600">
                        <strong class="text-red-500">-2%</strong>&nbsp;que la semaine dernière
                    </p>
                </div>
            </div>

            <div class="flex flex-col bg-white text-gray-700 shadow-md rounded-lg overflow-hidden">
                <div
                    class="bg-gradient-to-tr from-orange-600 to-orange-400 text-white absolute -mt-4 ml-4 rounded-full p-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" aria-hidden="true" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
                <div class="p-6 text-right">
                    <p class="text-sm font-medium text-gray-600">Nombre de commandes</p>
                    <h4 class="text-2xl font-semibold text-gray-900">{{ orderCount }}</h4>
                </div>
                <div class="border-t border-gray-200 p-4">
                    <p class="text-base font-normal text-gray-600">
                        <strong class="text-green-500">+5%</strong>&nbsp;qu'hier
                    </p>
                </div>
            </div>
        </div>

        <!-- Graphiques -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold mb-4">Graphique des ventes de produits</h3>
                <canvas id="myChart"></canvas>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold mb-4">Graphique des revenus des ventes</h3>
                <canvas id="revenueChart"></canvas>
            </div>
        </div>

        <!-- Liste des produits les plus vendus -->
        <div class="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold mb-4">Produits les plus vendus</h2>
            <ul>
                <li v-for="product in topProducts" :key="product.name" class="mb-2 flex justify-between items-center">
                    <span>{{ product.name }}</span>
                    <span>{{ product.sales }}</span>
                </li>
            </ul>
        </div>

        <!-- Liste des commandes récentes -->
        <div class="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold mb-4">Commandes récentes</h2>
            <ul>
                <!-- Exemple de commande récente -->
                <li class="mb-2 flex justify-between items-center">
                    <span>Commande #1234</span>
                    <span>$150</span>
                </li>
                <li class="mb-2 flex justify-between items-center">
                    <span>Commande #1235</span>
                    <span>$200</span>
                </li>
                <!-- Ajoutez des commandes ici -->
            </ul>
        </div>
    </main>
</template>

<style scoped>
canvas {
    max-width: 100%;
    height: auto;
}
</style>
