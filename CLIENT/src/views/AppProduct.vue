<script setup lang='ts'>
import { defineProps } from 'vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiClient from '../assets/js/apiClient'; // Assurez-vous que le chemin est correct

// const props = defineProps({
//     id: String,
//     name: String,
//     description: String,
//     price: String,
//     link_img: String
// });
const route = useRoute();
const product = ref(null);
const isLoading = ref(true);
const error = ref(null);


const fetchProduct = async () => {
  try {
    const response = await ApiClient.get(`/products/${route.params.id}`);
    product.value = response;
    console.log(product.value);
  } catch (err) {
    error.value = 'Erreur lors du chargement du produit.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchProduct);

  
</script>

<template>
  <div class="content" v-if="!isLoading && product">
    <div class="main_infos">
      <div class="images">
        <div class="all_images">
          <div class="img1">
            <img
              :src="product.images.length ? 'http://localhost:3000/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
              alt="">
          </div>
          <div class="img2">
            <img
              :src="product.images.length ? 'http://localhost:3000/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
              alt="">
          </div>
          <div class="img3">
            <img
              :src="product.images.length ? 'http://localhost:3000/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
              alt="">
          </div>
        </div>
        <div class="main_img">
          <img
            :src="product.images.length ? 'http://localhost:3000/uploads/' + product.images[0].url : '/src/assets/img/products/default.png'"
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
          <!-- Vous pouvez ajouter un bouton "Ajouter au panier" ici -->
        </div>
      </div>
    </div>
    <div class="detailed_description">
      <div class="nav_description">
        <ul>
          <li><a href="#description">Description</a></li>
          <li><a href="#caracteristiques">Caractéristiques</a></li>
          <li><a href="#autres-produits">Autres produits</a></li>
        </ul>
      </div>
      <div id="description" class="section">
        <h2>Description</h2>
        {{ product.description }}
      </div>
      <div id="caracteristiques" class="section">
        <h2>Caractéristiques</h2>
        <!-- Contenu des caractéristiques -->
      </div>
      <div id="autres-produits" class="section">
        <h2>Produits Similaires</h2>
        <!-- Contenu des autres produits -->
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
</style>
