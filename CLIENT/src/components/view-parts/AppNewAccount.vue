<script setup lang='ts'>
  import AppButtonSecondary from '../formComponents/AppButtonSecondary.vue';
  
</script>

<template>
    <div class="newAccount-page">
      <p>Pour commander et accéder à nos différents services, nous vous convions à créer un compte client. C’est simple, rapide et il vous apportera de nombreux avantages.</p>
      <div class="btnNewAccount">
        <AppButtonSecondary label="Créer votre compte" link="/create"></AppButtonSecondary>
      </div>
    </div>
  </template>
  
  <style scoped>

  .newAccount-page{
    width: 80%;
    margin: auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    h1{
        text-align: center;
        font-weight: 400;
    }
    p{
        width:80%;
        margin: auto;
        color: #575757;
    }
    .btnNewAccount{
        width: 80%;
        margin: auto;
    }
    @media (prefers-color-scheme: dark) {
        p{
          color: #fff;
        }
    }
  }
  
  </style>