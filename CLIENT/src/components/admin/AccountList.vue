<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Liste des Utilisateurs</h1>
        </div>
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full bg-white">
                <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th class="py-3 px-6 text-left">Prénom</th>
                        <th class="py-3 px-6 text-left">Nom</th>
                        <th class="py-3 px-6 text-left">Sexe</th>
                        <th class="py-3 px-6 text-left">Statut</th>
                        <th class="py-3 px-6 text-left">Email</th>
                        <th class="py-3 px-6 text-left">Téléphone</th>
                        <th class="py-3 px-6 text-left">Rôles</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr v-if="paginatedUsers.length === 0">
                        <td colspan="8" class="text-center py-4">Aucun utilisateur</td>
                    </tr>
                    <tr v-else v-for="user in paginatedUsers" :key="user.id"
                        class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left">{{ user.firstName }}</td>
                        <td class="py-3 px-6 text-left">{{ user.lastName }}</td>
                        <td class="py-3 px-6 text-left">{{ user.gender }}</td>
                        <td class="py-3 px-6 text-left">{{ user.status }}</td>
                        <td class="py-3 px-6 text-left">{{ user.email }}</td>
                        <td class="py-3 px-6 text-left">{{ user.phone }}</td>
                        <td class="py-3 px-6 text-left">{{ user.roles.join(', ') }}</td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center space-x-2 w-full gap-4">
                                <button @click="editUser(user.id)"
                                    class="bg-customGreen hover:bg-customGreen-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 w-1/3 flex items-center justify-center space-x-2">
                                    Modifier
                                </button>
                                <button @click="confirmDelete(user.id)"
                                    class="bg-customRed hover:bg-customRed-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 w-1/3 flex items-center justify-center space-x-2">
                                    Supprimer
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mt-10 space-x-2" v-if="totalPages > 1">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="flex px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                Précédent
            </button>
            <div class="flex items-center space-x-1">
                <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                    :class="['px-3 py-2 rounded-md transition duration-200', currentPage === page ? 'bg-customGreen text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400']">
                    {{ page }}
                </button>
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="flex px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                Suivant
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios'; // Assurez-vous de configurer axios correctement
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const users = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const router = useRouter();
const toast = useToast();

const fetchUsers = async () => {
    try {
        const response = await axios.get('/api/users'); // Assurez-vous que l'URL est correcte
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Fonction pour filtrer les utilisateurs selon la barre de recherche
const filteredUsers = computed(() => {
    return users.value.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Calcul du nombre total de pages
const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPage);
});

// Utilisateurs pour la page actuelle
const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredUsers.value.slice(start, end);
});

// Fonctions pour changer de page
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

// Appeler fetchUsers quand le composant est monté
onMounted(fetchUsers);

// Fonctions pour éditer et supprimer des utilisateurs
const editUser = (id) => {
    router.push({ name: 'EditUser', params: { id } });
};

const confirmDelete = (id) => {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        deleteUser(id);
    }
};

const deleteUser = async (id) => {
    try {
        await axios.delete(`/api/users/${id}`);
        users.value = users.value.filter(user => user.id !== id);
        toast.success('Utilisateur supprimé avec succès');
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Erreur lors de la suppression de l\'utilisateur');
    }
};
</script>

<style scoped>/* Ajoutez des styles supplémentaires si nécessaire */</style>
