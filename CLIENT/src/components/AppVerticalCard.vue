<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({     //Définition des données passées par le composants
    label: String,
    description: String,
    price: String,
    link: String,
    link_img: String
});

function navigate() {         //Fonction pour naviguer sur la page grace au lien fourni
  if (props.link) {
    window.location.href = props.link;
  }
}

function addToCart() {
    //Ajouter au panier
}
</script>
                          <!-- Composant Card Vertical -->
<template>        
    <div class="card_vertical">
        <img class="card_vertical_img" :src="props.link_img" :alt="props.label">
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

.card_vertical{
    background-color: #575757;
    color: #fff;
    max-width: 20%;
    min-width: 12rem;
    height: auto;
    margin: 1rem;
    padding: 0.8rem;
    border-radius: 8px;
    border: 0.7px #C4F649 solid;
    .card_vertical_img {
        height: auto;
        width: 100%;
        object-fit: contain; /* Permet de contenir l'image dans le conteneur */
      }
}
.infos{
    margin: 1rem 0;

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
.card_vertical .buy_div_container{
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cart_img_container{
        margin-right: 1rem;
        button{
            border: none;
            min-width: 2.5rem;
            height: 1.8rem;
            background-color: #d9d9d9;
            border-radius: 3px;
            box-shadow: 1px 2px #3838385d;
            padding: 0.2rem;
            &:hover{
                cursor: pointer;
            }
        }
        .cart_card{
            width: 100%;
            height: 100%;
        }
    }
}


@media (prefers-color-scheme: dark) {
    .card_vertical{
        background-color: #fff;
        color: black;
    }
}

</style>
