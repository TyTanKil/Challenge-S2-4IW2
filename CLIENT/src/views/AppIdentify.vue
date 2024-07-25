<script setup lang='ts'>
  import AppCreateAccount from './AppCreateAccount.vue';
  import AppLogin from './AppLogin.vue';

  import { ref } from 'vue';
  
  const isReturningClient = ref(true);
  
  const selectTab = (tab: string) => {
    isReturningClient.value = (tab === 'returning');
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
                    <AppCreateAccount></AppCreateAccount>
                </div>
            </div>
        </div>
    </div>
  </template>
  

  <style scoped>
  .identify-page{
    margin: 3rem auto;
    width: 60%;
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
  
.tabs-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    .content{
        width: 100%;
    }
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
    position: static;
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