<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';
import ApiClient from '../assets/js/apiClient'; // Assurez-vous que le chemin est correct

const toast = useToast();
const router = useRouter();
const store = useStore(); // Accéder au store Vuex

const account_button_route = ref('');
const cart_button_route = ref('');
const account_name = ref('');

if (store.state.user_id == null) {
  account_button_route.value = "/login";
  cart_button_route.value = "/login";
  account_name.value = "Compte";
} else {
  account_button_route.value = "/account";
  cart_button_route.value = "/cart";
  account_name.value = store.state.user_name;
}

const user = ref({});
const isAdmin = ref(false);
const fetchUserData = async () => {
  const userId = store.state.user_id;
  if(userId){
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      user.value = response.data;
      if (user.value.roles.includes('ROLE_ADMIN')) {
        isAdmin.value = true;
      } else {
        isAdmin.value = false;
      }
    } catch (error) {
      toast.error('Erreur lors de la récupération de l\'utilisateur');
    }
  }
};

fetchUserData();

const props = defineProps({
  route: Boolean,
});

// Recherche de produits
const searchQuery = ref('');
const products = ref([]);
const filteredProducts = computed(() => {
  if (!searchQuery.value) return [];
  return products.value.filter(product =>
    product.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (product.Category && product.Category.label.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    (product.Manufacturer && product.Manufacturer.label.toLowerCase().includes(searchQuery.value.toLowerCase()))
  ).slice(0, 8); // Afficher les 8 premiers résultats
});

const fetchProducts = async () => {
  try {
    const response = await ApiClient.get('/products');
    products.value = response;
  } catch (error) {
    toast.error('Erreur lors de la récupération des produits');
  }
};

fetchProducts();

const goToProduct = (id) => {
  router.push(`/product/${id}`);
  searchQuery.value = ('');
  setTimeout(() => {
    location.reload();
  }, 3);
  
};

</script>

<template>
  <div class="header">
    <a href="/">
      <img class="logo clear_mode" src="\src\assets\img\svg\TechShop_-_Brand_Logo\svg\logo-no-background.svg" alt="">
    </a>
    <div v-if="!props.route" class="search_bar">
      <input type="text" v-model="searchQuery" name="search" id="search" placeholder="Rechercher votre produit...">
      <ul v-if="filteredProducts.length" class="search-results">
        <li v-for="product in filteredProducts" :key="product._id" @click="goToProduct(product._id)">
          <a>{{ product.label }}</a>
        </li>
      </ul>
    </div>
    <div v-if="!props.route" class="actions_btn">
      <div v-if="isAdmin">
        <router-link to="/admin">
          <div class="account_div">
            <img class="clear_mode" src="\src\assets\img\svg\icons\settings-wheel.svg" alt="">
            <p>Admin</p>
          </div>
        </router-link>
      </div>
      <router-link :to="account_button_route">
        <div class="account_div">
          <img class="clear_mode" src="\src\assets\img\svg\icons\account-user.svg" alt="">
          <p>{{ account_name }}</p>
        </div>
      </router-link>
      <router-link :to="cart_button_route">
        <div class="cart_div">
          <img class="clear_mode" src="\src\assets\img\svg\icons\cart1.svg" alt="">
          <p>Panier</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #575757;
  display: flex;
  padding: 2rem;
  align-items: center;
  height: 6rem;
  z-index: 1000;
}

.logo {
  max-height: 7rem;
  margin: 0.5rem 4rem;
}

.dark_mode {
  display: none;
}

.search_bar {
  display: flex;
  flex-direction: row;
  width: 50%;
  align-items: center;
  position: relative;
}

.search_bar input {
  border: none;
  background-color: #d9d9d9;
  border-radius: 5px;
  min-width: 15rem;
  width: 90%;
  height: 2.5rem;
  padding: 0 0.8rem;
  font-size: 1rem;
}

.search_bar button {
  height: 2.5rem;
  border: none;
  background-color: #d9d9d9;
  border-radius: 0 5px 5px 0;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search_bar button img {
  height: 1.5rem;
}

.search_bar button:hover {
  background-color: #b2b2b2;
}

.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 0.1rem;
  width: 95%; 
  background-color: white;
  border: 1px solid #d9d9d9;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  border-radius: 0 0 5px 5px;
}

.search-results li {
  padding: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.search-results li:hover {
  background-color: #f0f0f0;
}

.actions_btn {
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: center;
  margin: 0 3rem;
  gap: 2.5rem;
  color: #C4F649;
}

.actions_btn a {
  color: #C4F649;
  text-decoration: none;
}

.actions_btn div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.actions_btn img {
  height: 2rem;
  width: auto;
}

@media (prefers-color-scheme: dark) {
  .header {
    background-color: #2a2a2a;
  }
}
</style>
