
<script setup lang="ts">

import AppVerticalCard from '../components/AppVerticalCard.vue';
import { useRouter } from 'vue-router';


const router = useRouter();

function handleSelect(product) {
  router.push({
    name: 'Product',
    params: {
      name: product.name,
      description: product.description,
      price: product.price,
      link_img: product.link_img
    }
  });
}

const props = defineProps({
  route: Boolean,
});



</script>

<template>
    <div v-if="props.route">
      <div class="cards">
        <AppVerticalCard 
          label="i9 9700K - Intel" 
          description="Le Intel Core i9-9700K est un processeur 8 cœurs, 8 threads, avec une fréquence allant de 3,6 GHz à 4,9 GHz. Conçu pour les gamers et créateurs, il offre des performances exceptionnelles et supporte l'overclocking grâce à son coefficient multiplicateur débloqué." 
          price="299.99" 
          link_img="/src/assets/img/products/img_product_CPU_i9_9700k.JPG"
          @select="handleSelect"
        ></AppVerticalCard>
        <AppVerticalCard 
          label="RTX 4090 - Asus" 
          description="C'est une super carte graphique qui marche super bien. Elle est faites pour faire tourner les meilleurs jeux." 
          price="529.99" 
          link_img="/src/assets/img/products/img_product_GPU_4060ti.png"
          @select="handleSelect"
        ></AppVerticalCard>
        <AppVerticalCard 
          label="16go RAM - HyperX" 
          description="La RAM HyperX 16 Go DDR4 offre des performances rapides et fiables pour les jeux et le multitâche intensif, idéale pour les gamers et les créateurs de contenu." 
          price="124.99" 
          link_img="/src/assets/img/products/img_product_RAM_16go_HyperX.JPG"
          @select="handleSelect"
        ></AppVerticalCard>
      </div>
      <div class="cards2">
        <AppVerticalCard 
          label="RTX 4090 - Asus" 
          description="C'est une super carte graphique qui marche super bien. Elle est faites pour faire tourner les meilleurs jeux." 
          price="529.99" 
          link_img="/src/assets/img/products/img_product_GPU_4060ti.png"
          @select="handleSelect"
        ></AppVerticalCard>
        <AppVerticalCard 
          label="i9 9700K - Intel" 
          description="Le Intel Core i9-9700K est un processeur 8 cœurs, 8 threads, avec une fréquence allant de 3,6 GHz à 4,9 GHz. Conçu pour les gamers et créateurs, il offre des performances exceptionnelles et supporte l'overclocking grâce à son coefficient multiplicateur débloqué." 
          price="299.99" 
          link_img="/src/assets/img/products/img_product_CPU_i9_9700k.JPG"
          @select="handleSelect"
        ></AppVerticalCard>
        <AppVerticalCard 
          label="16go RAM - HyperX" 
          description="La RAM HyperX 16 Go DDR4 offre des performances rapides et fiables pour les jeux et le multitâche intensif, idéale pour les gamers et les créateurs de contenu." 
          price="124.99" 
          link_img="/src/assets/img/products/img_product_RAM_16go_HyperX.JPG"
          @select="handleSelect"
        ></AppVerticalCard>
      </div>
    </div>
  </template>


<style>
.cards, .cards2{
  display: flex;
}
</style>
