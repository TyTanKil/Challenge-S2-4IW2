<script lang="ts" setup>
import AppInputText from './formComponents/AppInputText.vue';
import { defineProps } from 'vue';

const props = defineProps({     //Définition des données passées par le composants
    label: String,
    description: String,
    price: String,
    link: String,
    link_img: String
});

</script>
                          <!-- Composant Card Horizontal -->
<template>        
    <div class="header">
        <img class="logo" src="\src\assets\img\svg\TechShop_-_Brand_Logo\svg\logo-no-background.svg" alt="">
        <div class="search_bar">
            <AppInputText placeholder="Rechercher votre produit..."></AppInputText>
            <button>Loupe.png</button>
        </div>
        <div class="actions_btn">
            <div class="account_div">
                <img src="" alt="">
                <p>Compte</p>
            </div>
            <div class="cart_div">
                <img src="" alt="">
                <p>Panier</p>
            </div>
        </div>
    </div>
</template>

<style> 
/* Style de la card */
.header{
    background-color: #575757;
    display: flex;
    padding: 2rem;
    max-height: 5rem;
    min-height: 3rem;
    align-items: center;
    .logo{
        max-height: 100%;
        max-width: 30%;
        margin: 0.5rem 3rem;
    }
    .search_bar{
        display: flex;
        width: 40%;
        align-items: center;
        button{
            position: relative;
            right: 30px;
            height: 2.1rem;
            border: none;
            background-color: #fff;
            border-radius: 0 5px 5px 0;
            &:hover{
                background-color: #b2b2b2;
                cursor: pointer;
            }
        }
    }
    .actions_btn{
        display: flex;
        align-items: center;
        width: 30%;
        margin: 0 3rem;
        justify-content: space-between;
        color: #C4F649;
    }
}

</style>
