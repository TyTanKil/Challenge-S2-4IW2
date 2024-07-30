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
          </div>
          <div class="info-item">
            <span>Prénom: {{ user.firstName }}</span>
            <button @click="editField('firstName')">Modifier</button>
          </div>
          <div class="info-item">
            <span>Nom: {{ user.lastName }}</span>
            <button @click="editField('lastName')">Modifier</button>
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
          </div>
          <div class="info-item">
            <span>Membre depuis: {{ formatDate(user.createdAt) }}</span>
          </div>
          <button class="download-button" @click="downloadPersonalDataAsPDF">Télécharger mes données en PDF</button>
        </div>
        <div v-if="selectedTab === 'commandes'" class="orders">
          <div class="orders-container">
            <div v-if="orders.length">
              <div v-for="order in orders" :key="order.id" class="order-card">
                <h2>Commande #{{ order.id }}</h2>
                <p><strong>Date de la commande :</strong> {{ formatDate(order.order_date) }}</p>
                <p><strong>Statut de la livraison :</strong> {{ displayOrderStatus(order.delivery_status) }}</p>
                <p><strong>Total TTC :</strong> {{ order.total_price }} €</p>
                <div class="order-products">
                  <h3>Produits :</h3>
                  <div v-for="product in order.Order_products" :key="product.id" class="product-item">
                    <p><strong>Nom :</strong> {{ product.label }}</p>
                    <p><strong>Réf :</strong> {{ product.ref }}</p>
                    <p><strong>Description :</strong> {{ product.description }}</p>
                    <p><strong>Quantité :</strong> {{ product.quantity }}</p>
                    <p><strong>Prix unitaire :</strong> {{ product.unit_price }} €</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p>Aucune commande trouvée.</p>
            </div>
          </div>
        </div>
        <div v-if="selectedTab === 'parameters'" class="parameters">
          <h4 class="parameters-item">Gérer mes notifications mails</h4>
          <div class="parameters-item mails-item">
            <div class="switch-container">
              <label>Mails d'informations : </label>
              <div class="toggle_div">
                <span>Désactiver</span>
                <label class="switch">
                  <input type="checkbox" v-model="isMailsActivated" @change="toggleMailsActivation">
                  <span class="slider"></span>
                </label>
                <span>Activer</span>
              </div>

              <br>

              <label>Abonnement à la newsletter : </label>
              <div class="toggle_div">
                <span>Désactiver</span>
                <label class="switch">
                  <input type="checkbox" v-model="isNewsletterActivated" @change="toggleNewsletterActivation">
                  <span class="slider"></span>
                </label>
                <span>Activer</span>
              </div>
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
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import ApiClient from "@/assets/js/apiClient.js";

export default {
  name: "MyAccount",
  data() {
    return {
      selectedTab: 'infos',
      userProfilePhoto: '', 
      user: {},
      orders: [],
      isMailsActivated: false,
      isNewsletterActivated: false,
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = ref({});
    const orders = ref([]);
    const isMailsActivated = ref(false);
    const isNewsletterActivated = ref(false);

    const fetchUserData = async () => {
      const userId = store.state.user_id;
      try {
        user.value = await ApiClient.get(`/user/${userId}`);
        isMailsActivated.value = user.value.notification;
        isNewsletterActivated.value = user.value.newsletter;
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    const fetchOrders = async () => {
      const id_user = store.state.user_id;
      if (!id_user) {
        console.error('User ID is missing');
        return;
      }

      try {
        const response = await ApiClient.get(`/order/ByIdUser/${id_user}`);
        orders.value = response;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const displayOrderStatus = (status) => {
        const statusMap = {
            1: 'En cours',
            2: 'Expédiée',
            3: 'Livrée',
            4: 'Annulée'
        };
        return statusMap[status] || 'Inconnu';
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
      const { value: newValue } = await Swal.fire({
        title: `Modifier ${field}`,
        input: 'text',
        inputLabel: `Entrez le nouveau ${field}`,
        inputPlaceholder: `Nouveau ${field}`,
        showCancelButton: true,
        confirmButtonText: 'Sauvegarder',
        cancelButtonText: 'Annuler',
        inputValidator: (value) => {
          if (!value) {
            return 'Ce champ est requis !';
          }
        }
      });

      if (newValue) {
        try {
          await ApiClient.patch(`/user/${user.value.id}`, { [field]: newValue });
          await fetchUserData();
          Swal.fire({
            title: 'Succès',
            text: `Le champ ${field} a été modifié avec succès.`,
            icon: 'success'
          });
        } catch (error) {
          console.error(`Erreur lors de la modification du champ ${field}:`, error);
          Swal.fire({
            title: 'Erreur',
            text: `Erreur lors de la modification du champ ${field}. Veuillez réessayer.`,
            icon: 'error'
          });
        }
      }
    };

    const changePassword = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Modifier le mot de passe',
        html:
          '<input id="old-password" class="swal2-input" placeholder="Ancien mot de passe" type="password">' +
          '<input id="new-password" class="swal2-input" placeholder="Nouveau mot de passe" type="password">' +
          '<input id="new-password-confirmation" class="swal2-input" placeholder="Confirmez le nouveau mot de passe" type="password">',
        focusConfirm: false,
        preConfirm: () => {
          return {
            oldPassword: document.getElementById('old-password').value,
            newPassword: document.getElementById('new-password').value,
            newPasswordConfirmation: document.getElementById('new-password-confirmation').value
          };
        },
        showCancelButton: true,
        confirmButtonText: 'Sauvegarder',
        cancelButtonText: 'Annuler'
      });

      if (formValues) {
        const { oldPassword, newPassword, newPasswordConfirmation } = formValues;
        if (newPassword === newPasswordConfirmation) {
          try {
            const verifyResponse = await ApiClient.post(`/user/verify-password`, {
              accountId: user.value.id,
              password: oldPassword
            });

            if (verifyResponse.data.valid) {
              await ApiClient.patch(`/user/${user.value.id}`, { password: newPassword });
              await fetchUserData();
              Swal.fire({
                title: 'Succès',
                text: 'Le mot de passe a été modifié avec succès.',
                icon: 'success'
              });
            } else {
              Swal.fire({
                title: 'Erreur',
                text: 'L\'ancien mot de passe est incorrect. Veuillez réessayer.',
                icon: 'error'
              });
            }
          } catch (error) {
            console.error(`Erreur lors de la modification du mot de passe:`, error);
            Swal.fire({
              title: 'Erreur',
              text: 'Erreur lors de la modification du mot de passe. Veuillez réessayer.',
              icon: 'error'
            });
          }
        } else {
          Swal.fire({
            title: 'Erreur',
            text: 'Les mots de passe ne correspondent pas. Veuillez réessayer.',
            icon: 'error'
          });
        }
      }
    };

    const deleteAccount = async () => {
      const confirmDelete = await Swal.fire({
        title: 'Supprimer le compte',
        text: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
      });

      if (confirmDelete.isConfirmed) {
        try {
          await ApiClient.delete(`/user/${user.value.id}`);
          Swal.fire({
            title: 'Compte supprimé',
            text: 'Votre compte a été anonymisé avec succès.',
            icon: 'success'
          });
          logout();
        } catch (error) {
          console.error('Erreur lors de la suppression du compte:', error);
          Swal.fire({
            title: 'Erreur',
            text: 'Erreur lors de la suppression du compte. Veuillez réessayer.',
            icon: 'error'
          });
        }
      }
    };

    const toggleMailsActivation = async () => {
      try {
        await ApiClient.patch(`/user/${user.value.id}`, { notification: isMailsActivated.value });
        Swal.fire({
          title: 'Succès',
          text: 'L\'état des envois d\'emails a été mis à jour avec succès.',
          icon: 'success'
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour des envois d\'emails:', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Erreur lors de la mise à jour des envois d\'emails. Veuillez réessayer.',
          icon: 'error'
        });
      }
    };

    const toggleNewsletterActivation = async () => {
      try {
        await ApiClient.patch(`/user/${user.value.id}`, { newsletter: isNewsletterActivated.value });
        Swal.fire({
          title: 'Succès',
          text: 'L\'état de la newsletter a été mis à jour avec succès.',
          icon: 'success'
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la newsletter:', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Erreur lors de la mise à jour de la newsletter. Veuillez réessayer.',
          icon: 'error'
        });
      }
    };

    const downloadPersonalDataAsPDF = () => {
      const doc = new jsPDF();
      const data = {
        "Prénom": user.value.firstName,
        "Nom": user.value.lastName,
        "Email": user.value.email,
        "Date de naissance": formatDate(user.value.birth_date),
        "Téléphone": user.value.phone,
        "Login": user.value.login,
        "Membre depuis": formatDate(user.value.createdAt),
      };

      doc.text("Données personnelles de l'utilisateur", 10, 10);
      let y = 20;
      for (const [key, value] of Object.entries(data)) {
        doc.text(`${key}: ${value}`, 10, y);
        y += 10;
      }

      doc.save(`user_data_${user.value.firstName}_${user.value.lastName}.pdf`);
    };

    onMounted(() => {
      fetchUserData();
      fetchOrders();
    });

    return { 
      logout,
      user, 
      formatDate, 
      editField, 
      changePassword, 
      deleteAccount,
      toggleMailsActivation,
      toggleNewsletterActivation,
      isMailsActivated,
      isNewsletterActivated,
      downloadPersonalDataAsPDF,
      orders,
      displayOrderStatus,
    };
  },
};
</script>

<style scoped>
/* Slider */
.switch-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  gap: 1rem;
}

.toggle_div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
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
  height: 80vh;
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
    .download-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        background-color: #45a049;
      }
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

.orders {
  max-height: 500px; /* Hauteur maximale avec défilement */
  overflow-y: auto; /* Barre de défilement verticale si nécessaire */
  padding: 10px;
  border: 1px solid #ddd; /* Bordure optionnelle */
  background-color: #f9f9f9; /* Fond optionnel */
}

.order-card {
  margin-bottom: 20px; /* Espacement entre les cartes de commande */
  padding: 10px;
  border: 1px solid #ddd; /* Bordure des cartes de commande */
  background-color: #fff; /* Fond des cartes de commande */
  border-radius: 5px; /* Coins arrondis des cartes */
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