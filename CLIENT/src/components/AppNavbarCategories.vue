<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  categories: {
    type: Array as () => string[],
    required: true,
    validator: (value: string[]) => value.length === 4,
  },
  route: Boolean,
});
</script>
<!-- Composant Navbar -->
<template>
    <nav v-if="!$props.route" class="navbar">
        <div class="navbar-container">
            <div 
                v-for="(option, index) in categories" 
                :key="option" 
                :class="['categorie', `categorie-${index + 1}`]"
            >
                {{ option }}
            </div>
        </div>
    </nav>
</template>

<style> 
/* Style de la card */
nav.navbar{
    width: 80%;
    height: 2.5rem;
    margin: auto;
    margin-bottom: 2rem;
    .navbar-container{
        width: 100%;
        height: 100%;
        display: flex;
        .categorie{
            width: 25%;
            height: 100%;
            background-color: #A0DB10;
            border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            font-weight: 500;
            &:nth-child(1){
                border-radius: 0 0 0 20px;
            }
            &:nth-child(4){
                border-radius: 0 0 20px 0;
            }
            &:hover{
                background-color: #C4F649;
                cursor: pointer;
            }
        }
    }
    
}



@media (prefers-color-scheme: dark) {

}

</style>
