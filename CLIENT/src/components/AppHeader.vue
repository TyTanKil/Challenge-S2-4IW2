<script lang="ts" setup>
import AppInputText from './formComponents/AppInputText.vue';
import { defineProps } from 'vue';

const props = defineProps({     //Définition des données passées par le composants
    test: Boolean,
});
</script>

<template>        
    <div class="header">
        <img class="logo clear_mode" src="\src\assets\img\svg\TechShop_-_Brand_Logo\svg\logo-no-background.svg" alt="">
        <img class="logo dark_mode" src="\src\assets\img\svg\TechShop_-_Brand_Logo\svg\logo-no-background-dark.svg" alt="">
        <div v-if="!props.test" class="search_bar">
            <input type="text" name="search" id="search" placeholder="Rechercher votre produit...">
            <button><img src="\src\assets\img\svg\icons\loupe-search.svg" alt=""></button>
        </div>
        <div v-if="!props.test" class="actions_btn">
            <a href="">
                <div class="account_div">
                    <img class="clear_mode" src="\src\assets\img\svg\icons\account-user.svg" alt="">
                    <img class="dark_mode" src="\src\assets\img\svg\icons\account-user-dark.svg" alt="">
                    <p>Compte</p>
                </div>
            </a>
            <a href="">
                <div class="cart_div">
                    <img class="clear_mode" src="\src\assets\img\svg\icons\cart1.svg" alt="">
                    <img class="dark_mode" src="\src\assets\img\svg\icons\cart1-dark.svg" alt="">
                    <p>Panier</p>
                </div>
            </a>
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
    margin-bottom: 3rem;
    .logo{
        max-height: 100%;
        max-width: 22%;
        min-width: 15rem;
        margin: 0.5rem 4rem;
    }
    .dark_mode{
        display: none;
    }
    .search_bar{
        display: flex;
        width: 50%;
        align-items: center;
        justify-content: center;
        input{
            border: none;
            background-color: #d9d9d9;
            padding: 0.5rem;
            border-radius: 5px;
            min-width: 15rem;
            width: 80%
        }
        button{
            position: relative;
            right: 45px;
            height: 2.1rem;
            border: none;
            background-color: #fff;
            border-radius: 0 5px 5px 0;
            padding: .2rem;
            width: 3rem;
            &:hover{
                background-color: #b2b2b2;
                cursor: pointer;
            }
            img{
                height: 100%;
            }
        }
    }
    .actions_btn{
        display: flex;
        align-items: center;
        width: 30%;
        justify-content: center;
        margin: 0 3rem;
        gap: 2.5rem;
        color: #C4F649;
        a{
            color: #C4F649;
            text-decoration: none;
            div{
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
        img{
            height: 2rem;
            width: auto;
        }
    }
}

@media (prefers-color-scheme: dark) {
    .header{
        background-color: white;
        .clear_mode{
            display: none;
        }
        .dark_mode{
            display: block;
        }
        .search_bar button{
            background-color: #575757;
        }
        .actions_btn p{
            color: #000;
        }
    }
}

</style>
