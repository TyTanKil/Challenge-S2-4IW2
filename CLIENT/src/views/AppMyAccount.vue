<template>
    <div class="my-account">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="profile-photo">
          <img v-if="userProfilePhoto" :src="userProfilePhoto" alt="Profile Photo" />
          <svg v-else width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="black"/>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#fff"/>
          </svg>
        </div>
        <div class="user-info">
          <p>Pseudo</p>
          <p>Mail</p>
        </div>
        <button class="logout-button">Se déconnecter</button>
      </div>
  
      <!-- Main Content -->
      <div class="main-content">
        <div class="tabs">
          <div class="tab" :class="{ active: selectedTab === 'infos' }" @click="selectedTab = 'infos'">Mes infos</div>
          <div class="tab" :class="{ active: selectedTab === 'commandes' }" @click="selectedTab = 'commandes'">Mes commandes</div>
        </div>
        <div class="content">
          <div v-if="selectedTab === 'infos'">
            <!-- Contenu pour Mes infos -->
            <p>Contenu des infos de l'utilisateur...</p>
          </div>
          <div v-if="selectedTab === 'commandes'">
            <!-- Contenu pour Mes commandes -->
            <p>Contenu des commandes de l'utilisateur...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
    <script>
    export default {
      name: "MyAccount",
      data() {
      return {
        selectedTab: 'infos', // Onglet par défaut
        userProfilePhoto: '', 
      };
    }
    };
    </script>
  
    <style scoped>
    .my-account {
      display: flex;
      height: 70vh;
    }
    
    .sidebar {
      width: 20%;
      background-color: #575757;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
    }
    
    .profile-photo {
      width: 100px;
      height: 100px;
      background-color: #7d3cf8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      margin-bottom: 20px;
    }
    
    .user-info {
      flex-grow: 1;
      color:black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .logout-button {
      background: none;
      border: none;
      color: #e63946;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }
    
    .main-content {
      width: 80%;
      display: flex;
      flex-direction: column;
    }
    
    .tabs {
      display: flex;
      background-color: #A0DB10;
      color:black;
    }
    
    .tab {
      flex: 1;
      text-align: center;
      padding: 10px;
      cursor: pointer;
      border-right: 2px solid black;
      &:hover {
        background-color: #C4F649;
      }
    }
    
    .tab:last-child {
      border-right: none;
    }
    
    .content {
      flex-grow: 1;
      background-color: #90ee90;
      padding: 20px;
      box-sizing: border-box;
    }
    @media (prefers-color-scheme: dark) {
      .sidebar {
      width: 20%;
      background-color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
    }
  }
    </style>