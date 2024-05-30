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
  <button @click="navigate">{{ props.label }}</button>      
</template>

<style> 
/* Style du bouton */
button {
  font-family: "Aldrich", sans-serif;
  background-color: #C4F649; 
  border: none;
  color: black;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 4px;
  padding: 0.8rem;
  margin: 0.5rem;
  &:hover{
    cursor: pointer;
  }
  &:active{
    background-color: #A0DB10; 
  }
}
</style>
