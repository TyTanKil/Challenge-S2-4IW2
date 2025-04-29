<script lang="ts" setup>

</script>

<template>
  <div class="footer">
    <div class="grid-container">
      <div>
        <h2>Notre histoire</h2>
        <ul>
          <li><router-link to="/qui_sommes_nous">Qui sommes nous ?</router-link></li>
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
        <h2>Cadre légal</h2>
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
  color: #fff;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  z-index: 1000;
}

/* Logo en bas */
.logo {
  max-height: 6rem;
  margin-top: 1rem;
}

/* Contenu du footer */
.grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  text-align: left;
}

.grid-container h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.grid-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.grid-container li {
  margin-bottom: 0.75rem;
}

.grid-container a {
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease, text-decoration 0.2s;
}

.grid-container a:hover {
  text-decoration: underline;
  color: #C4F649;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .footer {
    background-color: #1e1e1e;
  }

  .grid-container a {
    color: #ddd;
  }

  .grid-container a:hover {
    color: #C4F649;
  }
}

/* Responsive sur petits écrans */
@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .grid-container h2 {
    margin-top: 1rem;
  }
}
</style>