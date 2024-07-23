<script lang="ts" setup>

</script>

<template>
  <div class="footer">
    <div class="grid-container">
      <div>
        <h2>Notre histoire</h2>
        <ul>
          <li><router-link to="">Qui sommes nous ?</router-link></li>
          <li><router-link to="">Nos services</router-link></li>
          <li><router-link to="/contact">Contactez nous</router-link></li>
        </ul>
      </div>
      <div>
        <h2>Nos produits</h2>
        <ul>
          <li><router-link to="">Composants</router-link></li>
          <li><router-link to="">PC Fixe</router-link></li>
          <li><router-link to="">PC Portable</router-link></li>
          <li><router-link to="">Périphérique</router-link></li>
        </ul>
      </div>
      <div>
        <h2>Notre histoire</h2>
        <ul>
          <li><router-link to="/cgv">Conditions générales de vente</router-link></li>
          <li><router-link to="/informations_legales">Informations légales</router-link></li>
          <li><router-link to="/donnees_personnelles">Données personnelles</router-link> et <router-link to="/declaration_cookies">cookies</router-link></li>
      </ul>
      </div>
    </div>
    <a href="/">
      <img class="logo clear_mode" src="\src\assets\img\svg\TechShop_-_Brand_Logo\svg\logo-no-background.svg" alt="">
    </a>
  </div>
</template>

<style scoped>
.footer {
  background-color: #575757;
  color: white;
  display: grid;
  padding: 2rem;
  align-items: center;
  height: auto;
  z-index: 1000;
  place-items: center;
}

.logo {
  max-height: 8rem;
  display: block;
  margin: 0 auto;
  padding-top: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5rem;
  justify-content: center;
  align-items: start;
  margin-bottom: 20px;

  h2 {
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
    color: white;
    margin-bottom: 10px;
  }

  a:hover {
    text-decoration: underline; /* Add underline on hover */
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 20px;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .footer {
    background-color: #2a2a2a;
  }
}
</style>