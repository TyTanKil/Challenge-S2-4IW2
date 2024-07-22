<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const toast = useToast();


const store = useStore(); // Accéder au store Vuex

const account_button_route = ref('');
const cart_button_route = ref('');
const account_name = ref('');

if(store.state.user_id == null){
  account_button_route.value = "/login";
  cart_button_route.value = "/login";
  account_name.value = "Compte";
}else{
  account_button_route.value = "/account";
  cart_button_route.value = "/cart";
  account_name.value = store.state.user_name;
}

const user = ref({});
const isAdmin = ref(false);
const fetchUserData = async () => {
      const userId = store.state.user_id;
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
    };


fetchUserData();

const props = defineProps({
  route: Boolean,
});
</script>

<template>
  <div class="header">
    <a href="/">
      <img class="logo clear_mode" src="\src\assets\img\svg\TechShop_-_Brand_Logo\svg\logo-no-background.svg" alt="">
    </a>
    <div v-if="!props.route" class="search_bar">
      <input type="text" name="search" id="search" placeholder="Rechercher votre produit...">
      <button><img src="\src\assets\img\svg\icons\loupe-search.svg" alt=""></button>
    </div>
    <div v-if="!props.route" class="actions_btn">
      <div v-if="isAdmin">
        <router-link to="admin">
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
  width: 50%;
  align-items: center;
}

.search_bar input {
  border: none;
  background-color: #d9d9d9;
  border-radius: 5px 0 0 5px;
  min-width: 15rem;
  width: 80%;
  height: 2.5rem; /* Assurez-vous que l'input a la même hauteur que le bouton */
  padding: 0 0.8rem;
  font-size: 1rem; /* Ajustez la taille de la police selon les besoins */
}

.search_bar button {
  height: 2.5rem; /* Même hauteur que l'input */
  border: none;
  background-color: #d9d9d9; /* Même couleur que l'input pour une transition en douceur */
  border-radius: 0 5px 5px 0;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search_bar button img {
  height: 1.5rem; /* Ajustez la taille de l'image de la loupe selon les besoins */
}

.search_bar button:hover {
  background-color: #b2b2b2;
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
  align-items: center; /* Centrer le texte sous l'icône */
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