<script lang="ts" setup>
import ApiClient from '@/assets/js/apiClient';
import { defineProps, ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

// Définition des propriétés passées au composant
const props = defineProps({
  id: Number,
  mongoId: String,
  label: String,
  description: String,
  price: String,
  link: String,
  link_img: String
});

const selectedQuantity = ref(1);
const quantityOptions = ref<number[]>([]);
const emits = defineEmits(['select', 'productAdded']);

const store = useStore();
const toast = useToast();

onMounted(async () => {
  try {
    const response = await ApiClient.post('/stock/ByIdProduct', { id_product: props.id });
    if (response.status === 200 && response.data.length > 0) {
      const maxQuantity = response.data[0].quantity;
      quantityOptions.value = Array.from({ length: maxQuantity }, (_, i) => i + 1);
    } else {
      console.error('Erreur lors de la récupération de la quantité du produit');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la quantité:', error);
  }
});

const addToCart = async () => {
  const id_user = store.state.user_id;
  console.log('User ID:', id_user);
  const productId = props.id;

  if (id_user == null) {
    toast.error('Vous devez être connecté pour ajouter un produit au panier');
    return;
  }

  try {
    let responseGetCart;
    let cartId;

    // Tenter de récupérer le panier existant
    try {
      responseGetCart = await ApiClient.post(`/cart/getByIDUser`, { id_user: id_user });
      if (responseGetCart.status === 200) {
        cartId = responseGetCart.data.id;
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Créer un nouveau panier si inexistant
        let responseCart = await ApiClient.put(`/cart`, { id_user: id_user });
        cartId = responseCart.data.id;
      } else {
        throw error;
      }
    }

    // Ajouter le produit avec la quantité sélectionnée
    const responseAddCart = await ApiClient.post(`/cartProduct/addProduct`, { 
      id_cart: cartId,
      id_product: productId,
      quantity: selectedQuantity.value
    });

    toast.success('Produit ajouté au panier');
    console.log('Product added:', responseAddCart.data);
    emits('productAdded', responseAddCart.data.id);
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    toast.error('Une erreur est survenue lors de l\'ajout du produit au panier');
  }
}

function selectCard() {
  emits('select', {
    id: props.id,
    mongoId: props.mongoId,
    name: props.label,
    description: props.description,
    price: props.price,
    link_img: props.link_img
  });
}
</script>

<template>
  <div class="card_horizontal" @click="selectCard">
    <img class="card_horizontal_img" :src="props.link_img" :alt="props.label" />

    <div class="card_content">
      <div class="infos">
        <h3>{{ props.label }}</h3>
        <p>{{ props.description }}</p>
      </div>

      <div class="card_bottom">
        <div class="left">
          <label for="quantity">Qté:</label>
          <select v-model="selectedQuantity" id="quantity" @click.stop>
            <option v-for="num in quantityOptions" :key="num" :value="num">{{ num }}</option>
          </select>
        </div>
        <div class="right">
          <p>{{ props.price }} €</p>
          <button @click.stop="addToCart">
            <img src="/src/assets/img/svg/icons/cart2.svg" alt="Ajouter au panier" class="cart_icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card_horizontal {
  display: flex;
  flex-direction: row;
  background-color: #575757;
  color: #fff;
  border-radius: 12px;
  border: 1px solid #C4F649;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  margin: 1rem auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card_horizontal:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card_horizontal_img {
  width: 15%;
  height: auto;
  object-fit: contain;
  background-color: white;
  padding: 0.5rem;
}

.card_content {
  padding: 1rem;
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.infos h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 500;
}

.infos p {
  margin: 0.5rem 0 1rem 0;
  font-size: 1rem;
  font-weight: 300;
  color: #ddd;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.card_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left label {
  margin-right: 0.5rem;
  font-weight: 500;
}

.left select {
  padding: 5px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.right p {
  font-size: 1.2rem;
  font-weight: 500;
  color: #C4F649;
}

.right button {
  background-color: #C4F649;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.right button:hover {
  background-color: #A0DB10;
  transform: scale(1.1);
}

.cart_icon {
  width: 24px;
  height: 24px;
}

@media (prefers-color-scheme: dark) {
  .card_horizontal {
    background-color: #1a1a1a;
    color: white;
    border-color: #C4F649;
  }

  .right button {
    background-color: #444;
  }

  .right button:hover {
    background-color: #333;
  }

  .right p {
    color: #C4F649;
  }
}
</style>
