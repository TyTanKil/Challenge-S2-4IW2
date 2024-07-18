<script setup lang='ts'>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    name: String,
    description: String,
    price: String,
    link_img: String
  });
</script>

<template>
  <div class="content">
    <div class="main_infos">
      <div class="images">
        <div class="all_images">
          <div class="img1">
            <img :src="link_img" alt="">
          </div>
          <div class="img2">
            <img :src="link_img" alt="">
          </div>
          <div class="img3">
            <img :src="link_img" alt="">
          </div>
        </div>
        <div class="main_img">
          <img :src="link_img" alt="">
        </div>
      </div>
      <div class="text_description">
        <div class="title">
          <h2>{{ props.name }}</h2>
        </div>
        <div class="description">
          <h3>{{ props.description }}</h3>
        </div>
        <div class="price">
          <h3>{{ price }} €</h3>
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
        {{props.description}}
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
</template>

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
