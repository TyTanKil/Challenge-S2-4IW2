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

console.log(props);


const emits = defineEmits(['select']);

function selectCard() {
  emits('select', {
    name: props.label,
    description: props.description,
    price: props.price,
    link_img: props.link_img
  });
}
</script>
                          <!-- Composant Card Vertical -->
<template>        
    <div class="card_vertical">
        <img @click="selectCard" class="card_vertical_img" :src="props.link_img" :alt="props.label">
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
    max-width: 25%;
    min-width: 12rem;
    height: auto;
    margin: 1rem;
    padding: 0.8rem;
    border-radius: 8px;
    border: 0.7px #C4F649 solid;
    transition: box-shadow 0.3s ease;
    &:hover{
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .card_vertical_img {
        height: auto;
        width: 100%;
        object-fit: contain; /* Permet de contenir l'image dans le conteneur */
        &:hover{
            cursor: pointer;
        }
      }
}
.infos{
    margin: 0.5rem 0;

    h3{
        font-weight: 500;
        margin: 0;
        font-size: x-large;
    }
    h4{
        font-weight: 300;
        margin: 0;
        font-size: medium;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* Limit to 3 lines */
        -webkit-box-orient: vertical;
        max-height: 60px; /* Limit the height */
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.card_vertical .buy_div_container{
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
        font-size: large;
        font-weight: 500;
    }
    .cart_img_container{
        margin-right: 1rem;
        button{
            border: none;
            min-width: 4rem;
            height: 3.2rem;
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
    .card_vertical{
        background-color: #fff;
        color: black;
    }
}

</style>
