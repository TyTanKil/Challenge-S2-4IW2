<script setup lang="ts">
import ApiClient from "@/assets/js/apiClient.js";
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
  hash: String,
});

const pageText = ref('');

const handleCreate = async () => {
  try {
    await ApiClient.patch( "/validate-account/" + props.hash);
    pageText.value = "Votre compte a été validé avec succès !";
  } catch ( error ) {
    pageText.value = "Une erreur est survenue lors de la validation de votre compte. Veuillez contater l'assistance.";
  }
}

onMounted(() => {
  handleCreate();
});
</script>

<template>
  <div class="validate-page">
    <h2>
      {{ pageText }}
    </h2>
  </div>
</template>

<style scoped>
.validate-page{
  margin: 3rem auto;
  width: 70%;
  min-width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
  h1{
    text-align: center;
    font-weight: 400;
  }
}
</style>