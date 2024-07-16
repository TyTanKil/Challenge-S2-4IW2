<script setup lang="ts">
import AppButtonPrimary from '../components/formComponents/AppButtonPrimary.vue';
import AppButtonSecondary from '../components/formComponents/AppButtonSecondary.vue';
import AppInputText from '../components/formComponents/AppInputText.vue';
import AppInputRadio from '../components/formComponents/AppInputRadio.vue';
import AppInputSelect from '../components/formComponents/AppInputSelect.vue';
import AppInputDate from '../components/formComponents/AppInputDate.vue';
import AppInputCheckbox from '../components/formComponents/AppInputCheckbox.vue';
import AppHorizontalCard from '../components/AppHorizontalCard.vue';
import AppVerticalCard from '../components/AppVerticalCard.vue';
import AppPopUp from '../components/AppPopUp.vue';

import AppHeader from '../components/AppHeader.vue';
import AppNavbarCategories from '../components/AppNavbarCategories.vue';
</script>

<template>
  <main>
    <AppButtonPrimary label="TEST" link="https://youtube.com"></AppButtonPrimary>
  </main>
  <br>
  <div>
    <AppButtonPrimary label="TEST" link="https://youtube.com"></AppButtonPrimary>
    <AppButtonPrimary label="CACA boudin blabla, ahahahaha" link="https://youtube.com"></AppButtonPrimary>
  </div>
  <AppButtonPrimary label="voila" link="https://youtube.com"></AppButtonPrimary>
  <AppButtonPrimary label="12346é" link="https://youtube.com"></AppButtonPrimary>
  <div>
    <AppButtonSecondary label="Connexion" link="https://youtube.com"></AppButtonSecondary>
    <AppButtonSecondary label="Inscription" link="https://youtube.com"></AppButtonSecondary>
  </div>
  <AppInputText label="Nom" placeholder="Nom" isNeeded></AppInputText>
  <AppInputText label="Prenom" placeholder="Prenom"></AppInputText>
  <AppInputText label="Mot de Passe" placeholder="Mot de Passe" hideContent isNeeded></AppInputText>
  <AppInputRadio label="Genre" :options="['M.', 'Mme.', 'Autre']"></AppInputRadio>
  <AppInputRadio label="Test" :options="['Option 1', 'Option 2', 'Option 3']" isNeeded></AppInputRadio>
  <AppInputSelect label="Choisir une option" :options="['Option 1', 'Option 2', 'Option 3']"></AppInputSelect>
  <AppInputSelect label="Pays" :options="['France', 'Allemagne', 'Suisse', 'Belgique', 'Espagne', 'Portugal', 'Afrique']"></AppInputSelect>
  <AppInputDate label="Date de naissance"></AppInputDate>
  <AppInputCheckbox label="Etes vous adopté ?"></AppInputCheckbox>
  <AppHorizontalCard label="RTX 4090" description="C'est une super carte graphique qui marche super bien. Elle estv faites pour faire tourner les meileurs jeux." price="529.99" link_img="/src/assets/img/products/img_product_1.png"></AppHorizontalCard>
  <AppVerticalCard label="RTX 4090" description="C'est une super carte graphique qui marche super bien. Elle estv faites pour faire tourner les meileurs jeux." price="529.99" link_img="/src/assets/img/products/img_product_1.PNG"></AppVerticalCard>

  <AppHeader> </AppHeader>
  <AppNavbarCategories :categories="['Promos et Bons plans', 'PC', 'Composants', 'Périphériques']"></AppNavbarCategories>

  <AppPopUp title="Mon Titre">
    <div>
        <p>Voici le contenu de la pop-up avec <strong>du HTML</strong>.</p>
        <ul>
          <li>Point 1</li>
          <li>Point 2</li>
          <li>Point 3</li>
        </ul>
      </div>
  </AppPopUp>
</template>

<style scoped>
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
