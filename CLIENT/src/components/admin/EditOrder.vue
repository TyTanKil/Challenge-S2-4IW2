<template>
    <div class="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <div class="flex justify-between items-center w-full max-w-4xl mb-6">
            <h1 class="text-2xl font-bold">Détails de la Commande</h1>
            <button @click="goBack"
                class="bg-customGreen  text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                Retour
            </button>
        </div>
        <div class="bg-white rounded-lg shadow p-6 space-y-6 w-full max-w-4xl">
            <div>
                <h2 class="text-lg font-bold mb-2">Informations sur la commande</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>ID:</strong> {{ order.id }}</p>
                    <p><strong>Utilisateur:</strong> {{ order.account?.firstName }} {{ order.account?.lastName }}</p>
                    <p><strong>Email:</strong> {{ order.account?.email }}</p>
                    <p><strong>Total:</strong> {{ order.total_price?.toFixed(2) }} €</p>
                    <p><strong>Date:</strong> {{ order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'
                    }}</p>
                    <p><strong>Statut:</strong> {{ displayOrderStatus(order.order_status) }}</p>
                </div>
            </div>
            <div>
                <h2 class="text-lg font-bold mb-2">Produits</h2>
                <ul class="list-disc pl-5 space-y-2">
                    <li v-for="product in order.Order_products" :key="product.id" class="flex justify-between items-center">
                        <div>
                            {{ product.label }} - {{ product.quantity }} x {{ product.unit_price.toFixed(2) }} €
                        </div>
                        <div class="bg-gray-100 text-gray-700 text-sm rounded px-2 py-1">
                            {{ (product.quantity * product.unit_price).toFixed(2) }} €
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ApiClient from '../../assets/js/apiClient';

const order = ref({});
const router = useRouter();
const route = useRoute();

const fetchOrderDetails = async () => {
    try {
        const orderId = route.params.id;
        const response = await ApiClient.get(`/order/${orderId}`);
        order.value = response;
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
};

const goBack = () => {
    router.push({ name: 'OrderList' });
};

const displayOrderStatus = (status) => {
    const statusMap = {
        1: 'En cours',
        2: 'Expédiée',
        3: 'Livrée',
        4: 'Annulée'
    };
    return statusMap[status] || 'Inconnu';
};

onMounted(fetchOrderDetails);
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */

</style>
