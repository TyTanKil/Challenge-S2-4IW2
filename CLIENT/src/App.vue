<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

const route = useRoute();

const isIdentifyRoute = computed(() => route.fullPath === '/identify' || route.fullPath === '/create' );
</script>

<template>
  <header>
    <AppHeader :test="isIdentifyRoute" />
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

@media (prefers-color-scheme: dark) {
  body {
    background-color: #575757;
    color: white;
  }
}
</style>