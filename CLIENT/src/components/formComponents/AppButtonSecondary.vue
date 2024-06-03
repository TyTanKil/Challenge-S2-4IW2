<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({     //Définition des données passées par le composants
  label: String,
  link: String
});

function navigate() {         //Fonction pour naviguer sur la page grace au lien fourni
  if (props.link) {
    window.location.href = props.link;
  }
}
</script>
                          <!-- Composant Bouton -->
<template>   
    <div class="button-secondary">
        <button id="secondary" @click="navigate">{{ props.label }}</button>      
    </div>     
</template>

<style> 
/* Style du bouton */
.button-secondary{
    width: 80%;
    margin: 0.5rem;
}
button#secondary {
  background-color: #000; 
  border: none;
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
  font-family: 'Exo', sans-serif;
  border-radius: 2rem;
  padding: 0.4rem 1.2rem;
  min-width: 10rem;
  &:hover{
    cursor: pointer;
    }
  &:active{
    background-color: #575757; 
  }
}
</style>
