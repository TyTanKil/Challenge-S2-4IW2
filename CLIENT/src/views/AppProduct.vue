<script setup lang='ts'>
import { ref, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import ApiClient from '../assets/js/apiClient';
import { useToast } from 'vue-toast-notification';
import {useStore} from "vuex";

const route = useRoute();
const product = ref(null);
const isLoading = ref(true);
const error = ref(null);

const store = useStore();
const toast = useToast();

const selectedQuantity = ref(1);
const quantityOptions = ref<number[]>([]);

let productId;

const fetchProduct = async () => {
  try {
    const response = await ApiClient.get(`/products/${route.params.id}`);
    product.value = response;
    productId = response.id;
    console.log(product.value);
  } catch (err) {
    error.value = 'Erreur lors du chargement du produit.';
  } finally {
    isLoading.value = false;
  }
};

const fetchProductQuantity = async () => {
  try {
    const response = await ApiClient.post('/stock/ByIdProduct', { id_product: productId });
    if (response.status === 200 && response.data.length > 0) {
      const maxQuantity = response.data[0].quantity;
      quantityOptions.value = Array.from({ length: maxQuantity }, (_, i) => i + 1);
    } else {
      toast.error('Erreur lors de la récupération de la quantité du produit');
    }
  } catch (error) {
    console.error('Error fetching product quantity:', error);
    toast.error('Erreur lors de la récupération de la quantité du produit');
  }
};

const addToCart = async () => {
  const id_user = store.state.user_id;
  console.log('User ID:', id_user);

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
      console.log('Response Cart:', responseGetCart);

      if (responseGetCart.status === 200) {
        cartId = responseGetCart.data.id;
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Si le panier n'existe pas (404), en créer un nouveau
        let responseCart = await ApiClient.put(`/cart`, { id_user: id_user });
        cartId = responseCart.data.id;
      } else {
        // Si une autre erreur survient, la gérer
        throw error;
      }
    }

    // Ajouter le produit avec la quantité sélectionnée
    let responseAddCart = await ApiClient.post(`/cartProduct/addProduct`, {
      id_cart: cartId,
      id_product: productId,
      quantity: selectedQuantity.value
    });
    toast.success('Produit ajouté au panier');
    console.log('Product added:', responseAddCart.data);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    toast.error('Une erreur est survenue lors de l\'ajout du produit au panier');
  }
}

onMounted(async () => {
  await fetchProduct();
  if (productId) {
    await fetchProductQuantity();
  }
});

  
</script>

<template>
  <div class="content" v-if="!isLoading && product">
    <div class="main_infos">
      <div class="images">
        <div class="all_images">
          <div class="img1">
            <img
              :src="product.images.length ? store.state.api_endpoint + '/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
              alt="">
          </div>
          <div class="img2">
            <img
              :src="product.images.length ? store.state.api_endpoint + '/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
              alt="">
          </div>
          <div class="img3">
            <img
              :src="product.images.length ? store.state.api_endpoint + '/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
              alt="">
          </div>
        </div>
        <div class="main_img">
          <img
            :src="product.images.length ? store.state.api_endpoint + '/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
            alt="">
        </div>
      </div>
      <div class="text_description">
        <div class="title">
          <h2>{{ product.label }}</h2>
        </div>
        <div class="description">
          <h3>{{ product.description }}</h3>
        </div>
        <div class="price">
          <h3>{{ product.unit_price }} €</h3>
        </div>
        <div class="cart">
          <div class="quantity_selector">
            <label for="quantity">Quantité : </label>
            <select v-model="selectedQuantity" id="quantity">
              <option v-for="num in quantityOptions" :key="num" :value="num">
                {{ num }}
              </option>
            </select>
          </div>
          <div class="buy_div_container">
            <div class="cart_img_container">
              <button @click="addToCart">
                <img class="cart_card" src="\src\assets\img\svg\icons\cart2.svg" alt="">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detailed_description">
      <div class="nav_description">
        <ul>
          <li><a href="#description">Description</a></li>
          <li><a href="#autres-produits">Autres produits</a></li>
        </ul>
      </div>
      <div id="description" class="section">
        <h2>Description</h2>
        {{ product.description }}
      </div>
      <div id="autres-produits" class="section">
        <h2>Produits Similaires</h2>
      </div>
    </div>
  </div>
  <div v-else-if="isLoading">
  <p>Loading...</p>
</div>
<div v-else>
  <p>{{ error }}</p>
</div></template>


<style scoped>
.content{
  padding: 0 2rem;
  display: flex;
}
.main_infos{
  display: flex;
  flex-direction: column;
  width: 50%;
}

.text_description{
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  margin-bottom: 2rem;
  gap: 1rem;
}
.title h2{
  font-size: 2rem;
  color: black;
}
.description h3{
  font-size: 1rem;
  font-weight: 500;
}
.price h3{
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
}

.detailed_description{
  background-color: #e5e5e5;
  width: 100%;
}

.nav_description{
  background-color: #3a3a3a;
  color: white;
  padding: 1rem;
  ul{
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    margin: 0 3rem;
    gap: 1rem;
  }
  li{
    cursor: pointer;
  }
  a{
    color: white;
    text-decoration: none;
  }
  a:hover{
    text-decoration: none;
    color: #c4f649;
  }
}

.section{
  padding: 2rem;
}

.images{
  display: flex;
}
.all_images{
  display: flex;
  flex-direction: column;
}
img{
  width: 7rem;
  height: auto;
}
.main_img img{
  width: 24rem;
  height: auto;
}
.cart{
  display: flex;
  align-items: center;
  gap: 20px;
}
.buy_div_container {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.buy_div_container p {
  font-size: large;
  font-weight: 500;
}
.cart_img_container {
  margin-right: 1rem;
}
.cart_img_container button {
  border: none;
  min-width: 4rem;
  height: 3.2rem;
  background-color: #C4F649;
  border-radius: 8px;
  box-shadow: 1px 2px #3838385d;
  padding: 0.4rem;
}
.cart_img_container button:hover {
  cursor: pointer;
  background-color: #A0DB10;
}
.cart_card {
  width: 100%;
  height: 100%;
}
</style>
