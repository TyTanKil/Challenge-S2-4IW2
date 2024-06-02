<script setup lang='ts'>
  import AppButtonPrimary from '../components/formComponents/AppButtonPrimary.vue'
  import AppButtonSecondary from '../components/formComponents/AppButtonSecondary.vue';
  import AppInputText from '../components/formComponents/AppInputText.vue';
  import AppInputCheckbox from '../components/formComponents/AppInputCheckbox.vue';
  import AppInputSelect from '../components/formComponents/AppInputSelect.vue';
  import AppLogin from '../components/view-parts/AppLogin.vue';
  import AppNewAccount from '../components/view-parts/AppNewAccount.vue';

  import { ref } from 'vue';
  
  const isReturningClient = ref(true);
  
  const selectTab = (tab: string) => {
    isReturningClient.value = (tab === 'returning');
  };
  
  const createAccount = () => {
    // Logique pour créer un compte
    console.log('Création de compte');
  };
</script>

<template>
    <div class="identify-page">
        <h1>Identifiez-vous !</h1>
        <div class="tabs-container">
            <div class="tabs">
                <div class="customers">
                    <div
                    :class="['tab', { active: isReturningClient }]"
                    @click="selectTab('returning')"
                    >
                    Déjà client ?
                    </div>
                    <div
                    :class="['tab', { active: !isReturningClient }]"
                    @click="selectTab('new')"
                    >
                    Nouveau client ?
                    </div>
                </div>
                <div class="underline-container">
                    <div class="underline" :class="{ active: !isReturningClient }"></div>
                </div>
            </div>
            
            <div class="content">
            <div v-if="isReturningClient">
                <!-- Contenu pour les clients existants -->
                <AppLogin></AppLogin>
            </div>
            <div v-else>
                <!-- Contenu pour les nouveaux clients -->
                <AppNewAccount></AppNewAccount>
            </div>
            </div>
        </div>
    </div>
  </template>
  

  <style scoped>
  .identify-page{
    margin-top: 2rem;
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    h1{
        text-align: center;
        font-weight: 400;
    }
  }
  
.tabs-container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
  .tabs {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    flex-direction: column;
    width: 80%;
    margin: auto;
  }
  
  .customers{
    display: flex;
  }
  

  .tab {
    cursor: pointer;
    padding: 10px 20px;
    font-size: 1.2rem;
    transition: smooth 0.3s ease;
    color: #5f5f5f;
  }
  
  .tab.active {
    font-weight: bold;
    color: rgb(0, 0, 0);
  }
  
  .underline-container {
    display: flex;
    align-items: center;
    width: 60%;
    height: 2px;
    background-color: #000;
    margin-top: 5px;
    position: relative;
  }
  
  .underline {
    width: 50%;
    height: 2px;
    background-color: limegreen;
    transition: transform 0.3s ease;
  }
  
  .underline.active {
    transform: translateX(100%);
  }

  @media (prefers-color-scheme: dark) {
    .tab {
        cursor: pointer;
        padding: 10px 20px;
        font-size: 1.2rem;
        transition: smooth 0.3s ease;
        color: #d3d3d3;
      }

      .tab.active {
        font-weight: bold;
        color: #fff;
      }

      p{
        color: #d3d3d3;
      }
  }
  </style>
