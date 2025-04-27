<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

import AppMainView from './views/AppMainView.vue'

const route = useRoute();

const isIdentifyRoute = computed(() => route.fullPath === '/login' || route.fullPath === '/create' );
const isMainRoute = computed(() => route.fullPath === '/');
const isAdminRoute = computed(() => route.fullPath.startsWith('/admin'));

</script>

<template>
  <div id="app">
    <header v-if="!isAdminRoute">
      <AppHeader :route="isIdentifyRoute" />
    </header>

    <main :class="{ 'admin-route': isAdminRoute, 'default-route': !isAdminRoute }">
      <AppMainView :route="isMainRoute" />
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>


<style>
body {
  background-color: white;
  color: #575757;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #575757;
}
main {
  flex: 1;
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