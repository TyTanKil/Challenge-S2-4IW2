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
                <button><img class="cart_card" src="\src\assets\img\svg\icons\cart2.svg" alt=""></button>
            </div>
        </div>
    </div>
</template>

<style> 
/* Style de la card */

.card_horizontal {
    background-color: #575757;
    color: #fff;
    width: 60%;
    max-height: 9rem;
    min-height: 7rem;
    margin: 1rem;
    padding: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: 0.7px #C4F649    solid;
    p{
        font-size: large;
        font-weight: 500;
    }
    .card_horizontal_img {
        height: 7rem;
        width: auto;
        object-fit: contain; /* Permet de contenir l'image dans le conteneur */
        margin: 0 1rem 0 3rem;
      }
      .infos{
        width: 60%;
        h3{
            font-weight: 500;
            margin: 0;
            font-size: x-large;
        }
        h4{
            font-weight: 300;
            margin: 0;
            font-size: medium
        }
    }
  }
  
 
  

.card_horizontal .buy_div_container{
    display: flex;
    align-items: center;
    gap: 1rem;
    .cart_img_container{
        button{
            border: none;
            min-width: 3.5rem;
            height: 2.8rem;
            background-color: #C4F649;
            border-radius: 8px;
            box-shadow: 1px 2px #3838385d;
            padding: 0.4rem;
            &:hover{
                cursor: pointer;
                background-color: #A0DB10;
            }
        }
        .cart_card{
            width: 100%;
            height: 100%;
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
