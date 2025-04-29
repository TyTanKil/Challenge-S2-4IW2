<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';
import ApiClient from '../assets/js/apiClient';

const toast = useToast();
const router = useRouter();
const store = useStore();

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
  if(store.state.user_id){
    try {
      user.value = await ApiClient.get('/user/me');
      isAdmin.value = user.value.roles.includes('ROLE_ADMIN');
    } catch (error) {
      toast.error('Erreur lors de la récupération de l\'utilisateur');
    }
  }
};

fetchUserData();

const props = defineProps({
  route: Boolean,
});

const searchQuery = ref('');
const products = ref([]);
const filteredProducts = computed(() => {
  if (!searchQuery.value) return [];
  return products.value.filter(product =>
    product.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (product.Category && product.Category.label.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    (product.Manufacturer && product.Manufacturer.label.toLowerCase().includes(searchQuery.value.toLowerCase()))
  ).slice(0, 8);
});

const fetchProducts = async () => {
  try {
    const response = await ApiClient.get('/products');
    products.value = response;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits');
  }
};

fetchProducts();

const goToProduct = (id) => {
  router.push(`/product/${id}`);
  searchQuery.value = '';
  setTimeout(() => {
    location.reload();
  }, 3);
};

const goToSearchResults = () => {
  if (searchQuery.value) {
    router.push({ name: 'SearchResults', query: { q: searchQuery.value } });
    searchQuery.value = '';
    setTimeout(() => {
    location.reload();
  }, 3);
  }
};
</script>

<template>
  <div class="header">
    <a href="/">
      <img class="logo clear_mode" src="\src\assets\img\svg\TechShop_-_Brand_Logo\svg\logo-no-background.svg" alt="">
    </a>
    <div v-if="!props.route" class="search_bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        name="search" 
        id="search" 
        placeholder="Rechercher votre produit..." 
        @keyup.enter="goToSearchResults">

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
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  height: auto;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Logo */
.logo {
  height: 3.5rem;
  max-width: 180px;
}

/* Barre de recherche */
.search_bar {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search_bar input {
  width: 100%;
  height: 2.5rem;
  border: none;
  border-radius: 6px;
  padding: 0 1rem;
  font-size: 1rem;
  background-color: #d9d9d9;
  transition: all 0.2s ease-in-out;
}

.search_bar input:focus {
  outline: none;
}

/* Résultats de recherche */
.search-results {
  list-style: none;
  padding: 0;
  margin: 0.3rem 0 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 6px 6px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
}

.search-results li {
  padding: 0.6rem 1rem;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: background 0.2s;
}

.search-results li:hover {
  background-color: #eee;
}

/* Actions utilisateurs : compte, admin, panier */
.actions_btn {
  display: flex;
  align-items: center;
  gap: 2rem;
  color: #C4F649;
}

.actions_btn a {
  text-decoration: none;
  color: inherit;
}

.account_div, .cart_div {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  transition: transform 0.2s ease-in-out;
}

.account_div:hover,
.cart_div:hover {
  transform: scale(1.05);
}

.actions_btn img {
  height: 1.8rem;
  margin-bottom: 0.3rem;
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .header {
    background-color: #1e1e1e;
  }

  .search_bar input {
    background-color: #333;
    color: #fff;
  }

  .search-results {
    background-color: #2e2e2e;
    color: #f0f0f0;
    border-color: #444;
  }

  .search-results li:hover {
    background-color: #444;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .actions_btn {
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .search_bar {
    width: 100%;
    max-width: 100%;
  }

  .logo {
    margin: 0 auto;
  }
}
</style>