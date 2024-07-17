<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppNavbarCategories from './components/AppNavbarCategories.vue';

import AppMainView from './views/AppMainView.vue'

const route = useRoute();


const isIdentifyRoute = computed(() => route.fullPath === '/identify' || route.fullPath === '/create' );
const isAccountRoute = computed(() => route.fullPath === '/identify' || route.fullPath === '/create' || route.fullPath === '/account' );

const isMainRoute = computed(() => route.fullPath === '/');
</script>

<template>
  <header>
    <AppHeader :route="isIdentifyRoute" />
    <AppNavbarCategories :route="isAccountRoute" :categories="['Promos et Bons plans', 'PC', 'Composants', 'Périphériques']"></AppNavbarCategories>

    
  </header>
  <main>
    <AppMainView :route="isMainRoute"></AppMainView>

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
main{
  width: 80%;
  margin: 0 auto;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #575757;
    color: white;
  }
}
</style>