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
        <p>{{ user.firstName }} {{ user.lastName }}</p>
        <p>{{ user.email }}</p>
      </div>
      <button class="logout-button" @click="logout">Se déconnecter</button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="tabs">
        <div class="tab" :class="{ active: selectedTab === 'infos' }" @click="selectedTab = 'infos'">Mes infos</div>
        <div class="tab" :class="{ active: selectedTab === 'commandes' }" @click="selectedTab = 'commandes'">Mes commandes</div>
      </div>
      <div class="content">
        <div v-if="selectedTab === 'infos'" class="infos">
          <!-- Contenu pour Mes infos -->
          <div class="info-item">
            <span>Email: {{ user.email }}</span>
            <button @click="editField('email')">Modifier</button>
          </div>
          <div class="info-item">
            <span>Prénom: {{ user.firstName }}</span>
          </div>
          <div class="info-item">
            <span>Nom: {{ user.lastName }}</span>
          </div>
          <div class="info-item">
            <span>Date de naissance: {{ formatDate(user.birth_date) }}</span>
          </div>
          <div class="info-item">
            <span>Téléphone: {{ user.phone }}</span>
            <button @click="editField('phone')">Modifier</button>
          </div>
          <div class="info-item">
            <span>Login: {{ user.login }}</span>
            <button @click="editField('login')">Modifier</button>
          </div>
          <div class="info-item">
            <span>Membre depuis: {{ formatDate(user.createdAt) }}</span>
          </div>
          <div class="info-item">
            <button class="change-password-button" @click="changePassword">Modifier le mot de passe</button>
          </div>
        </div>
        <div v-if="selectedTab === 'commandes'" class="orders">
          <!-- Contenu pour Mes commandes -->
          <p>Contenu des commandes de l'utilisateur...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "MyAccount",
  data() {
    return {
      selectedTab: 'infos',
      userProfilePhoto: '', 
      user: {}
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = ref({});

    const fetchUserData = async () => {
      const userId = store.state.user_id;
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        user.value = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    };

    const logout = () => {
      store.dispatch('logout');
      router.push('/login');
    };

    const editField = async (field) => {
      let newValue = prompt(`Entrez le nouveau ${field}:`);
      if (newValue !== null) {
        try {
          await axios.patch(`http://localhost:3000/user/${user.value.id}`, { [field]: newValue });
          // Mettre à jour l'utilisateur après modification
          await fetchUserData();
          alert(`Le champ ${field} a été modifié avec succès.`);
        } catch (error) {
          console.error(`Erreur lors de la modification du champ ${field}:`, error);
          alert(`Erreur lors de la modification du champ ${field}. Veuillez réessayer.`);
        }
      }
    };

    const changePassword = async () => {
      let oldPassword = prompt('Entrez votre ancien mot de passe:');
      let newPassword = prompt('Entrez votre nouveau mot de passe:');
      let newPasswordConfirmation = prompt('Confirmez votre nouveau mot de passe:');
      if (oldPassword !== null && newPassword !== null && newPasswordConfirmation !== null) {
        if (newPassword === newPasswordConfirmation) {
          try {
            await axios.patch(`http://localhost:3000/user/${user.value.id}`, { password:newPassword });
            // Mettre à jour l'utilisateur après modification
            await fetchUserData();
            alert(`Le mot de passe a été modifié avec succès.`);
          } catch (error) {
              console.error(`Erreur lors de la modification du mot de passe:`, error);
              alert(`Erreur lors de la modification du mot de passe. Veuillez réessayer.`);
            }
        } else {
            alert('Les mots de passe ne correspondent pas. Veuillez réessayer.');
          }
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return { logout, user, formatDate, editField, changePassword };
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
  background-color: #d9d9d9;
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
  color: black;
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
  .infos{
    .info-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      color: #000;
      margin: 1.5rem;
      button{
        background-color: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        margin-left: 2rem;
        cursor: pointer;
        border-radius: 5px;
        &:hover{
          background-color: #0056b3;
        }
      }
      .change-password-button {
        background-color: #e63946;
        color: white;
        border: none;
        padding: 10px;
        margin-left: 0;
        cursor: pointer;
        border-radius: 5px;
        &:hover {
          background-color: #b22a36;
        }
      }
    }
    p{
    margin: 2rem 1rem;
    color: black;
  }
  }
}

.tabs {
  display: flex;
  background-color: #A0DB10;
  color: black;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-right: 2px solid black;
}

.tab:last-child {
  border-right: none;
}

.tab.active {
  background-color: #C4F649;
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