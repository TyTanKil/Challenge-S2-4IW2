<script lang="ts" setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  categories: {
    type: Array as () => string[],
    required: true,
    validator: (value: string[]) => value.length === 4,
  },
  route: Boolean,
});

const router = useRouter();
const activeCategory = ref<string | null>(null);

const setActiveCategory = (category: string) => {
  activeCategory.value = activeCategory.value === category ? null : category;
};

const navigateToSubCategory = (category: string, subCategory: string) => {
  router.push({ name: 'SubCategory', params: { category, subCategory } });
};

const navigateToAllProducts = (category: string) => {
  router.push({ name: 'CategoryAll', params: { category } });
};

const subCategories = {
  'Promos et Bons plans': ['Offres du jour', 'Réductions spéciales', 'Dernières chances'],
  'PC': ['PC portables', 'PC de bureau', 'PC gaming', 'PC tout-en-un'],
  'Composants': ['Processeur', 'Cartes mère', 'Cartes graphique', 'Mémoire RAM'],
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
          <div 
            v-for="subCategory in subCategories[activeCategory]" 
            :key="subCategory" 
            class="sub-categorie"
            @click.stop="navigateToSubCategory(option, subCategory)"
          >
            {{ subCategory }}
          </div>
          <div class="sub-categorie" @click.stop="navigateToAllProducts(option)">
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
  position: relative;
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
  position: relative;
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
  position: absolute;
  top: 130%;
  left: 0;
  width: 100%;
  background-color: #575757;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  z-index: 1000;
  color: black;
  font-weight: 600;
  padding: 0.8rem 0;
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
