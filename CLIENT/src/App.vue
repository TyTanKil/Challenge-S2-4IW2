<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppNavbarCategories from './components/AppNavbarCategories.vue';

const route = useRoute();

const isIdentifyRoute = computed(() => route.fullPath === '/identify' || route.fullPath === '/create');
const isAdminRoute = computed(() => route.fullPath.startsWith('/admin'));

</script>

<template>
    <header v-if="!isAdminRoute">
      <AppHeader :route="isIdentifyRoute" />
    <AppNavbarCategories :route="isIdentifyRoute" :categories="['Promos et Bons plans', 'PC', 'Composants', 'Périphériques']"></AppNavbarCategories>
  </header>
  <main>
    
    <RouterView />
  </main>
</template>


<style>
body {
  background-color: white;
  color: #575757;
}
header{
  position: sticky;
  top: 0;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #575757;
    color: white;
  }
}
</style>