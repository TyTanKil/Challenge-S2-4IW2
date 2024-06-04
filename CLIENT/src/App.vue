<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppNavbarCategories from './components/AppNavbarCategories.vue';

const route = useRoute();

const isIdentifyRoute = computed(() => route.fullPath === '/identify' || route.fullPath === '/create' );
</script>

<template>
  <header>
    <AppHeader :route="isIdentifyRoute" />
  </header>
  <AppNavbarCategories :route="isIdentifyRoute" :categories="['Promos et Bons plans', 'PC', 'Composants', 'Périphériques']"></AppNavbarCategories>
  <main>
    
    <RouterView />
  </main>
</template>


<style>
body {
  background-color: white;
  color: #575757;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #575757;
    color: white;
  }
}
</style>