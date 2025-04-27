<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toast-notification';
import ApiClient from '@/assets/js/apiClient';

const props = defineProps({
  id: Number,
  label: String,
  description: String,
  price: String,
  link: String,
  link_img: String
});

const selectedQuantity = ref(1);
const quantityOptions = ref<number[]>([]);
const store = useStore();
const toast = useToast();
const emits = defineEmits(['productAdded']);

onMounted(async () => {
  try {
    const response = await ApiClient.post('/stock/ByIdProduct', { id_product: props.id });
    if (response.status === 200 && response.data.length > 0) {
      const maxQuantity = response.data[0].quantity;
      quantityOptions.value = Array.from({ length: maxQuantity }, (_, i) => i + 1);
    }
  } catch (error) {
    console.error('Error fetching product quantity:', error);
  }
});

const addToCart = async () => {
  const id_user = store.state.user_id;
  if (!id_user) {
    toast.error('Vous devez être connecté pour ajouter un produit au panier');
    return;
  }

  try {
    let responseGetCart = await ApiClient.post(`/cart/getByIDUser`, { id_user });
    let cartId = responseGetCart.status === 200 ? responseGetCart.data.id : null;

    if (!cartId) {
      const responseCart = await ApiClient.put(`/cart`, { id_user });
      cartId = responseCart.data.id;
    }

    const responseAddCart = await ApiClient.post(`/cartProduct/addProduct`, {
      id_cart: cartId,
      id_product: props.id,
      quantity: selectedQuantity.value
    });

    toast.success('Produit ajouté au panier');
    emits('productAdded', responseAddCart.data.id);
  } catch (error) {
    toast.error('Erreur lors de l\'ajout au panier');
    console.error(error);
  }
};
</script>

<template>
  <div class="card_horizontal">
    <img class="card_horizontal_img" :src="props.link_img" :alt="props.label" />

    <div class="card_content">
      <div class="infos">
        <h3>{{ props.label }}</h3>
        <p>{{ props.description }}</p>
      </div>

      <div class="card_bottom">
        <div class="left">
          <label for="quantity">Qté:</label>
          <select v-model="selectedQuantity" id="quantity">
            <option v-for="num in quantityOptions" :key="num" :value="num">{{ num }}</option>
          </select>
        </div>
        <div class="right">
          <p>{{ props.price }} €</p>
          <button @click="addToCart">
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
