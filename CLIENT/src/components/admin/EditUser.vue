<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div class="w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-8 color-dark">Modifier un Utilisateur</h1>
            <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md space-y-6">
                <FormInput id="firstName" label="Prénom" type="text" :modelValue="user.firstName"
                    @update:modelValue="user.firstName = $event" required class="mb-4" />
                <FormInput id="lastName" label="Nom" type="text" :modelValue="user.lastName"
                    @update:modelValue="user.lastName = $event" required class="mb-4" />
                <FormInput id="email" label="Email" type="email" :modelValue="user.email"
                    @update:modelValue="user.email = $event" required class="mb-4" />
                <FormInput id="phone" label="Téléphone" type="text" :modelValue="user.phone"
                    @update:modelValue="user.phone = $event" required class="mb-4" />
                <FormInput id="login" label="Login" type="text" :modelValue="user.login"
                    @update:modelValue="user.login = $event" required class="mb-4" />
                <FormInput id="birth_date" label="Date de naissance" type="date" :modelValue="user.birth_date"
                    @update:modelValue="user.birth_date = $event" required class="mb-4" />
                <FormSelect id="gender" label="Genre" :options="genders" :modelValue="user.gender"
                    @update:modelValue="user.gender = $event" required class="mb-4" />
                <FormSelect id="status" label="Statut" :options="statuses" :modelValue="user.status"
                    @update:modelValue="user.status = $event" required class="mb-4" />

                <!-- Rôles avec cases à cocher stylisées -->
                <div>
                    <label class="block text-sm font-medium">Rôles</label>
                    <div class="mt-2 space-y-2">
                        <div v-for="role in roles" :key="role.value" class="flex items-center">
                            <input type="checkbox" :id="role.value" :value="role.value" v-model="user.roles"
                                class="form-checkbox m-5 h-5 w-5 x transition duration-150 ease-in-out">
                            <label :for="role.value" class="ml-2 block text-sm">{{ role.text }}</label>
                        </div>
                    </div>
                </div>

                <div class="flex justify-between items-center">
                    <button type="submit"
                        class="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Enregistrer
                    </button>
                    <button type="button" @click="confirmDelete"
                        class="bg-customRed hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Supprimer
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import FormSelect from '../formComponents/admin/FormSelect.vue';
import FormInput from '../formComponents/admin/FormInput.vue';
import ApiClient from '../../assets/js/apiClient';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const genders = ref([
    { value: 'm', text: 'Masculin' },
    { value: 'f', text: 'Féminin' },
    { value: 'a', text: 'Autre' }
]);

const statuses = ref([
    { value: 'a', text: 'Activé' },
    { value: 'd', text: 'Désactivé' },
    { value: 's', text: 'Suspendu' },
    { value: 'c', text: 'Confirmation' }
]);

const roles = ref([
    { value: 'ROLE_USER', text: 'Utilisateur' },
    { value: 'ROLE_STORE_KEEPER', text: 'Magasinier' },
    { value: 'ROLE_ADMIN', text: 'Administrateur' }
]);

const user = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    login: '',
    birth_date: '',
    gender: '',
    status: '',
    roles: []
});

onMounted(async () => {
    const userId = route.params.id;
    try {
        const response = await ApiClient.get(`/user/${userId}`);
        user.value = response;
        user.value.birth_date = user.value.birth_date.split('T')[0]; // Formatage de la date de naissance pour l'input de type date
    } catch (error) {
        console.error('Error fetching user:', error);
    }
});

const submitForm = async () => {
    const userId = route.params.id;
    try {
        await ApiClient.patch(`/user/edit/${userId}`, user.value);
        toast.success('Utilisateur modifié avec succès');
        router.push({ name: 'UserList' });
    } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Erreur lors de la modification de l\'utilisateur');
    }
};

const confirmDelete = () => {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        deleteUser();
    }
};

const deleteUser = async () => {
    const userId = route.params.id;
    try {
        await ApiClient.delete(`/user/${userId}`);
        toast.success('Utilisateur supprimé avec succès');
        router.push({ name: 'UserList' });
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Erreur lors de la suppression de l\'utilisateur');
    }
};
</script>

<style scoped>
.form-checkbox:checked {
    @apply bg-indigo-600 border-transparent;
}

.form-checkbox:checked+label {
    @apply text-indigo-900;
}
@media (prefers-color-scheme: dark) {
  .color-dark {
      color: #575757;
  }
}
</style>
