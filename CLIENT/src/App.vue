<script setup lang='ts'>

</script>

<template>
  <main>
    <p>
      <strong>Fil d'arianne : </strong> {{ $route.fullPath }}
    </p>
    <nav>
      <RouterLink to="/identify">Go to identify page</RouterLink>
      <RouterLink to="/test">Go to Test</RouterLink>
    </nav>
    <RouterView />
</main>
    <br>
 
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