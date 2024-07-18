<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppNavbarCategories from './components/AppNavbarCategories.vue';

import AppMainView from './views/AppMainView.vue'

const route = useRoute();

const isIdentifyRoute = computed(() => route.fullPath === '/login' || route.fullPath === '/create' );
const isAccountRoute = computed(() => route.fullPath === '/login' || route.fullPath === '/create' || route.fullPath === '/account' );
const isMainRoute = computed(() => route.fullPath === '/');
const isAdminRoute = computed(() => route.fullPath.startsWith('/admin'));

</script>

<template>
    <header v-if="!isAdminRoute">
      <AppHeader :route="isIdentifyRoute" />
    <AppNavbarCategories :route="isAccountRoute" :categories="['Promos et Bons plans', 'PC', 'Composants', 'Périphériques']"></AppNavbarCategories>    
  </header>
    <main :class="{ 'admin-route': isAdminRoute, 'default-route': !isAdminRoute }">
      <AppMainView :route="isMainRoute"></AppMainView>
    <RouterView />
  </main>
</template>


<style>
body {
  background-color: white;
  color: #575757;
  height: 100vh;
}
header{
  position: sticky;
  top: 0;
}
main.default-route {
  width: 80%;
  margin: 0 auto;
}

main.admin-route {
  width: 100%; 
  margin: 0;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #575757;
    color: white;
  }
}
</style>
