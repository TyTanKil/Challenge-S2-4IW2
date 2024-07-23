<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import ApiClient from '@/assets/js/apiClient';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const store = useStore();
const toast = useToast();
const emits = defineEmits(['productDeleted']);

const props = defineProps({     //Définition des données passées par le composants
    id: Number,
    label: String,
    description: String,
    price: String,
    quantity: Number,
    link: String,
    link_img: String,
    cartProductId: Number
});

function navigate() {         //Fonction pour naviguer sur la page grace au lien fourni
  if (props.link) {
    window.location.href = props.link;
  }
}

const deleteProduct = async () => {
    const id_user = store.state.user_id;
    console.log('User ID:', id_user);
    console.log('Props:', props);

    if (id_user == null) {
        toast.error('Vous devez être connecté pour supprimer un produit du panier');
        return;
    }

    try {
        const response = await ApiClient.post(`/cart/getByIDUser`, { id_user: id_user });
        let cartId = response.data.id;
        let productId = props.id;

        const responseDelete = await ApiClient.get(`/getByIds/${cartId}/${productId}`);
        
        toast.success('Produit supprimé du panier');
        emits('productDeleted', props.cartProductId);
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        toast.error('Une erreur est survenue lors de la suppression du produit du panier');
    }
};

</script>

<!-- Composant Card Horizontal -->
<template>        
  <div class="card_product_cart">
      <img class="card_product_cart_img" :src="props.link_img" :alt="props.label">
      <div class="infos">
          <h3>{{ props.label }}</h3>
          <h4>{{ props.description }}</h4>
      </div>
      <div class="buy_div_container">
          <div class="price_quantity_container">
              <p>Prix : {{ props.price }} €</p>
              <p><span>Quantité : {{ props.quantity }}</span></p>
          </div>
          <div class="action_div_container">
              <button @click="deleteProduct">
                  <img class="cart_card" src="\src\assets\img\svg\icons\trash.svg" alt="">
              </button>
          </div>
      </div>
  </div>
</template>

<style scoped>
.card_product_cart {
  background-color: #575757;
  color: #fff;
  width: 70%;
  max-height: 10rem;
  min-height: 8rem;
  margin: 1rem;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 0.7px #C4F649 solid;
  transition: box-shadow 0.3s ease;
}

.card_product_cart:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card_product_cart_img {
  height: 7rem;
  width: auto;
  object-fit: contain;
  margin: 0 1rem 0 0;
}

.infos {
  width: 60%;
  margin: 0.5rem 0;
}

.infos h3 {
  font-weight: 500;
  margin: 0;
  font-size: x-large;
}

.infos h4 {
  font-weight: 300;
  margin: 0;
  font-size: medium;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.buy_div_container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 30%;
}

.price_quantity_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
}

.price_quantity_container p {
  font-size: large;
  font-weight: 500;
}

.price_quantity_container p span {
  font-size: medium;
  font-weight: 300;
}

.action_div_container {
  margin-right: 1rem;
}

.action_div_container button {
  border: none;
  width: 2rem;  /* Adjusted width */
  height: 2rem; /* Adjusted height */
  background-color: #C4F649;
  border-radius: 8px;
  box-shadow: 1px 2px #3838385d;
  padding: 0.2rem; /* Adjusted padding */
}

.action_div_container button:hover {
  cursor: pointer;
  background-color: #A0DB10;
}

.action_div_container img {
  width: 100%;
  height: 100%;
}

@media (prefers-color-scheme: dark) {
  .card_product_cart {
      background-color: #fff;
      color: black;
  }
}
</style>
