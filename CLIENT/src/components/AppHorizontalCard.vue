<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({     //Définition des données passées par le composants
    label: String,
    description: String,
    price: String,
    link: String,
    link_img: String
});

console.log(props.link_img);

function navigate() {         //Fonction pour naviguer sur la page grace au lien fourni
  if (props.link) {
    window.location.href = props.link;
  }
}
</script>
                          <!-- Composant Card Horizontal -->
<template>        
    <div class="card_horizontal">
        <img class="card_horizontal_img" :src="props.link_img" :alt=" props.label ">
        <div class="infos">
            <h3>{{ props.label }}</h3>
            <h4>{{ props.description }}</h4>
        </div>
        <div class="buy_div_container">
            <p>Prix : {{ props.price }} €</p>
            <div class="cart_img_container">
                <button><img src="" alt=""></button>
            </div>
        </div>
    </div>
</template>

<style> 
/* Style de la card */

.card_horizontal {
    background-color: #575757;
    color: #fff;
    width: 90%;
    max-height: 8rem;
    min-height: 5rem;
    margin: 1rem;
    padding: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: 0.7px #C4F649    solid;
    .card_horizontal_img {
        height: 5rem;
        width: auto;
        object-fit: contain; /* Permet de contenir l'image dans le conteneur */
        margin: 0 2rem;
      }
  }
  
 
  
.infos{
    h3{
        font-weight: 500;
        margin: 0;
    }
    h4{
        font-weight: 400;
        margin: 0;
        font-size: small;
    }
}
.card_horizontal .buy_div_container{
    display: flex;
    align-items: center;
    gap: 1rem;
    .cart_img_container{
        button{
            border: none;
            min-width: 3rem;
            height: 1.5rem;
            background-color: #d9d9d9;
            border-radius: 3px;
            box-shadow: 1px 2px #3838385d;
            &:hover{
                cursor: pointer;
            }
        }
    }
}


@media (prefers-color-scheme: dark) {
    .card_horizontal{
        background-color: #fff;
        color: black;
    }
}

</style>
