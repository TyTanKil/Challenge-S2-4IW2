<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Liste des Catégories</h1>
            <button @click="addCategory"
                class="bg-customGreen hover:bg-green-600 text-black font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                <a href="/admin/category/new">Ajouter une catégorie</a>
            </button>
        </div>
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Rechercher des catégories..."
                class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full bg-white">
                <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th class="py-3 px-6 text-left">Nom</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr v-for="category in filteredCategories" :key="category.id"
                        class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left">{{ category.label }}</td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center space-x-2 w-full gap-4">
                                <button @click="editCategory(category.id)"
                                    class="bg-customGreen hover:bg-customGreen-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 w-1/3 flex items-center justify-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button @click="confirmDelete(category.id)"
                                    class="btn-red hover:bg-customGreen-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 w-1/3 flex items-center justify-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '../../axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
const categories = ref([]);
const searchQuery = ref('');
const router = useRouter();
const toast = useToast();

const fetchCategories = async () => {
    try {
        const response = await axios.get('/category');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Fonction pour filtrer les catégories selon la barre de recherche
const filteredCategories = computed(() => {
    return categories.value.filter(category =>
        category.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Appeler fetchCategories quand le composant est monté
onMounted(fetchCategories);

// Fonctions pour ajouter, éditer et supprimer des catégories
const addCategory = () => {
    router.push({ name: 'AddCategory' });
};

const editCategory = (id) => {
    router.push({ name: 'EditCategory', params: { id } });
};

const confirmDelete = (id) => {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
        deleteCategory(id);
    }
};

const deleteCategory = async (id) => {
    try {
        await axios.delete(`/category/${id}`);
        categories.value = categories.value.filter(category => category.id !== id);
        toast.success('Catégorie supprimée avec succès');
    } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Erreur lors de la suppression de la catégorie');
    }
};
</script>

<style scoped></style>
