<script lang="ts" setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  categories: {
    type: Array as () => string[],
    required: true,
    validator: (value: string[]) => value.length === 4,
  },
  route: Boolean,
});

// État local pour suivre la catégorie active
const activeCategory = ref<string | null>(null);

const setActiveCategory = (category: string) => {
  activeCategory.value = activeCategory.value === category ? null : category;
};

// Exemple de données de sous-catégories pour chaque catégorie
const subCategories = {
  'Promos et Bons plans': ['Offres du jour', 'Réductions spéciales', 'Dernières chances'],
  'PC': ['PC portables', 'PC de bureau', 'PC gaming', 'PC tout-en-un'],
  'Composants': ['Processeurs', 'Cartes mères', 'Cartes graphiques', 'Mémoire RAM'],
  'Périphériques': ['Claviers', 'Souris', 'Écrans', 'Casques audio'],
};
</script>

<template>
  <nav v-if="!$props.route" class="navbar">
    <div class="navbar-container">
      <div 
        v-for="(option, index) in categories" 
        :key="option" 
        :class="['categorie', `categorie-${index + 1}`]"
        @click="setActiveCategory(option)"
      >
        {{ option }}
        <div v-if="activeCategory === option" class="sub-menu">
          <div v-for="subCategory in subCategories[activeCategory]" :key="subCategory" class="sub-categorie">
            {{ subCategory }}
          </div>
          <div class="sub-categorie">
            Voir tout
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Style de la card */
nav.navbar {
  width: 80%;
  margin: auto;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.navbar-container {
  width: 100%;
  height: 2.5rem;
  display: flex;
  position: relative; /* Ajouté pour permettre au sous-menu de se positionner par rapport à ce conteneur */
}

.categorie {
  width: 25%;
  height: 100%;
  background-color: #A0DB10;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: 500;
  cursor: pointer;
  position: relative; /* Nécessaire pour positionner le sous-menu */
}

.categorie:nth-child(1) {
  border-radius: 0 0 0 20px;
}

.categorie:nth-child(4) {
  border-radius: 0 0 20px 0;
}

.categorie:hover {
  background-color: #C4F649;
}

.sub-menu {
  position: absolute; /* Permet au sous-menu de flotter */
  top: 102%; /* Place le sous-menu juste en dessous de la catégorie */
  left: 0; /* Aligne le sous-menu avec la catégorie */
  width: 100%; /* Assure que la largeur du sous-menu correspond à celle de la catégorie */
  background-color: #C4F649;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  z-index: 1000; /* Assure que le sous-menu est au-dessus des autres éléments */
  color: black;
  font-weight: 600;
}

.sub-categorie {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  margin: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  color: #575757;
  font-weight: 400;
}

.sub-categorie:hover {
  background-color: #e0e0e0;
}

@media (prefers-color-scheme: dark) {
  .sub-menu {
    background-color: #2a2a2a;
    color: white;
  }
}
</style>
