<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({     //Définition des données passées par le composants
    id: Number,
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
        <img class="card_horizontal_img" :src="props.link_img" :alt="props.label">
        <div class="infos">
            <h3>{{ props.label }}</h3>
            <h4>{{ props.description }}</h4>
        </div>
        <div class="buy_div_container">
            <p>Prix : {{ props.price }} €</p>
        </div>
    </div>
</template>

<style scoped>
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
        border: 0.7px #C4F649 solid;
        transition: box-shadow 0.3s ease;
    }
    .card_horizontal:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .card_horizontal_img {
        height: 7rem;
        width: auto;
        object-fit: contain;
        margin: 0 1rem 0 0;
    }
    .infos {
        width: 60%;
        margin: 0.5rem 0;
    }
    .infos h3 {
        font-weight: 500;
        margin: 0;
        font-size: x-large;
    }
    .infos h4 {
        font-weight: 300;
        margin: 0;
        font-size: medium;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .buy_div_container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .buy_div_container p {
        font-size: large;
        font-weight: 500;
    }

    @media (prefers-color-scheme: dark) {
        .card_horizontal {
            background-color: #fff;
            color: black;
        }
    }
</style>
