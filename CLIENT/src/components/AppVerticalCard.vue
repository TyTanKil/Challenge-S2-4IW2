<script lang="ts" setup>
import ApiClient from '@/assets/js/apiClient';
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const props = defineProps<{
  id: number;
  id_pg?: string;
  id_mongo: string;
  label: string;
  description: string;
  price: string;
  link?: string;
  link_img: string;
}>();

const emits = defineEmits<{
  (e: 'select', product: {
    id: number;
    name: string;
    description: string;
    price: string;
    link_img: string;
  }): void;
  (e: 'productAdded', id: number): void;
}>();

const store = useStore();
const toast = useToast();
const selectedQuantity = ref(1);
const quantityOptions = ref<number[]>([]);

onMounted(async () => {
  try {
    const res = await ApiClient.post('/stock/ByIdProduct', { id_product: props.id });
    if (res.status === 200 && res.data.length > 0) {
      const max = res.data[0].quantity;
      quantityOptions.value = Array.from({ length: max }, (_, i) => i + 1);
    }
  } catch (error) {
    console.error('Erreur stock produit :', error);
  }
});

const addToCart = async () => {
  const userId = store.state.user_id;
  if (!userId) {
    toast.error('Vous devez être connecté pour ajouter un produit au panier');
    return;
  }

  try {
    let cartId: number;
    try {
      const res = await ApiClient.post(`/cart/getByIDUser`, { id_user: userId });
      cartId = res.data.id;
    } catch (error: any) {
      if (error.response?.status === 404) {
        const res = await ApiClient.put(`/cart`, { id_user: userId });
        cartId = res.data.id;
      } else {
        throw error;
      }
    }

    const resAdd = await ApiClient.post(`/cartProduct/addProduct`, {
      id_cart: cartId,
      id_product: props.id,
      quantity: selectedQuantity.value
    });

    toast.success('Produit ajouté au panier');
    emits('productAdded', resAdd.data.id);
  } catch (error) {
    console.error('Ajout panier erreur :', error);
    toast.error("Erreur lors de l'ajout au panier");
  }
};

const selectCard = () => {
  emits('select', {
    id: props.id,
    name: props.label,
    description: props.description,
    price: props.price,
    link_img: props.link_img
  });
};
</script>

<template>
  <div class="card_vertical">
    <img @click="selectCard" class="card_vertical_img" :src="link_img" :alt="label" />

    <div class="infos">
      <h3>{{ label }}</h3>
      <h4>{{ description }}</h4>
    </div>

    <div class="quantity_selector">
      <label for="quantity">Quantité:</label>
      <select v-model="selectedQuantity" id="quantity">
        <option v-for="num in quantityOptions" :key="num" :value="num">{{ num }}</option>
      </select>
    </div>

    <div class="buy_div_container">
      <p>Prix : {{ price }} €</p>
      <div class="cart_img_container">
        <button @click="addToCart">
          <img class="cart_card" src="/src/assets/img/svg/icons/cart2.svg" alt="Ajouter au panier" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card_vertical {
    background-color: #575757;
    color: #fff;
    max-width: 25%;
    min-width: 12rem;
    height: auto;
    margin: 1rem;
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid #C4F649;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card_vertical:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
}

.card_vertical_img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.card_vertical_img:hover {
    cursor: pointer;
    transform: scale(1.05);
}

.infos {
    margin: 1rem 0;
    text-align: center;
}

.infos h3 {
    font-weight: 500;
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.infos h4 {
    font-weight: 300;
    margin: 0;
    font-size: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.quantity_selector {
    margin: 10px 0;
    text-align: center;
}

.quantity_selector label {
    margin-right: 10px;
    font-weight: 500;
}

.quantity_selector select {
    padding: 5px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
    transition: all 0.3s ease;
}

.quantity_selector select:hover {
    border-color: #C4F649;
    background-color: #f0f0f0;
}

.buy_div_container {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.buy_div_container p {
    font-size: 1.2rem;
    font-weight: 500;
    color: #C4F649;
}

.cart_img_container {
    display: flex;
    justify-content: center;
}

.cart_img_container button {
    border: none;
    padding: 0.8rem;
    background-color: #C4F649;
    border-radius: 8px;
    box-shadow: 1px 2px #3838385d;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.cart_img_container button:hover {
    cursor: pointer;
    background-color: #A0DB10;
    transform: scale(1.1);
}

.cart_card {
    width: 24px;
    height: 24px;
}

@media (prefers-color-scheme: dark) {
    .card_vertical {
        background-color: #1a1a1a;
        color: white;
        border-color: #C4F649;
    }

    .cart_img_container button {
        background-color: #444;
    }

    .cart_img_container button:hover {
        background-color: #333;
    }

    .buy_div_container p {
        color: #C4F649;
    }
}
</style>