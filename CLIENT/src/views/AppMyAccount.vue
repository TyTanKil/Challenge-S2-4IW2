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
      </div>
      <button class="logout-button" @click="logout">Se déconnecter</button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="tabs">
        <div class="tab" :class="{ active: selectedTab === 'infos' }" @click="selectedTab = 'infos'">Mes infos</div>
        <div class="tab" :class="{ active: selectedTab === 'commandes' }" @click="selectedTab = 'commandes'">Mes commandes</div>
        <div class="tab" :class="{ active: selectedTab === 'parameters' }" @click="selectedTab = 'parameters'">Mes paramètres</div>
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
        </div>
        <div v-if="selectedTab === 'commandes'" class="orders">
          <!-- Contenu pour Mes commandes -->
          <p>Contenu des commandes de l'utilisateur...</p>
        </div>
        <div v-if="selectedTab === 'parameters'" class="parameters">
          <h4 class="parameters-item">Gérer mes notifications mails</h4>
          <div class="parameters-item mails-item">
            <div class="switch-container">
              <span>Tout désactiver</span>
              <label class="switch">
                <input type="checkbox" v-model="isActivated" @change="toggleActivation">
                <span class="slider"></span>
              </label>
              <span>Tout activer</span>
            </div>         
          </div>
          <div class="parameters-item">
            <button class="change-password-button" @click="changePassword">Modifier le mot de passe</button>
          </div>
          <div class="parameters-item">
            <button class="delete-account-button" @click="deleteAccount">Supprimer mon compte</button>
          </div>
          
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
      user: {},
      isActivated: false, // Pour le switch
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = ref({});
    const isActivated = ref(false);

    const fetchUserData = async () => {
      const userId = store.state.user_id;
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        user.value = response.data;
        // Initialiser l'état du switch avec la valeur de la notification de l'utilisateur
        isActivated.value = user.value.notification;
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
            // Vérifier l'ancien mot de passe
            const verifyResponse = await axios.post(`http://localhost:3000/user/verify-password`, {
              accountId: user.value.id,
              password: oldPassword
            });

            if (verifyResponse.data.valid) {
              await axios.patch(`http://localhost:3000/user/${user.value.id}`, { password: newPassword });
              // Mettre à jour l'utilisateur après modification
              await fetchUserData();
              alert(`Le mot de passe a été modifié avec succès.`);
            } else {
              alert('L\'ancien mot de passe est incorrect. Veuillez réessayer.');
            }
          } catch (error) {
            console.error(`Erreur lors de la modification du mot de passe:`, error);
            alert(`Erreur lors de la modification du mot de passe. Veuillez réessayer.`);
          }
        } else {
          alert('Les mots de passe ne correspondent pas. Veuillez réessayer.');
        }
      }
    };

    const deleteAccount = async () => {
      const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:3000/user/${user.value.id}`);
          alert('Votre compte a été anonymisé avec succès.');
          logout();
        } catch (error) {
          console.error('Erreur lors de la suppression du compte:', error);
          alert('Erreur lors de la suppression du compte. Veuillez réessayer.');
        }
      }
    };

    const toggleActivation = async () => {
      try {
        await axios.patch(`http://localhost:3000/user/${user.value.id}`, { notification: isActivated.value });
        alert('L\'état des notifications a été mis à jour avec succès.');
      } catch (error) {
        console.error('Erreur lors de la mise à jour des notifications:', error);
        alert('Erreur lors de la mise à jour des notifications. Veuillez réessayer.');
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return { logout, user, formatDate, editField, changePassword, deleteAccount, toggleActivation, isActivated };
  },
};
</script>


<style scoped>
/* Slider */
.switch-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

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
  background-color: #d9d9d9;
  border: none;
  color: #e63946;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  &:hover{
    background-color: #c7c7c7;
  }
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
      margin: 1.7rem 1.5rem;
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
    }
    p{
      margin: 2rem 1rem;
      color: black;
    }
  }
  .parameters{
    .parameters-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      color: #000;
      margin: 1.5rem;
      button{
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