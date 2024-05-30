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
  <button id="secondary" @click="navigate">{{ props.label }}</button>      
</template>

<style> 
/* Style du bouton */
button#secondary {
  background-color: #000; 
  border: none;
  color: white;
  font-weight: lighter;
  font-size: 0.9rem;
  border-radius: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0.5rem;
  &:hover{
    cursor: pointer;
    }
  &:active{
    background-color: #575757; 
  }
}
</style>
