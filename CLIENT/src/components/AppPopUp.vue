<template>
  <div>
    <button @click="openPopUp">Ouvrir la Pop-Up</button>
    
    <div v-if="isVisible" class="popup-overlay">
      <div class="popup">
        <h2>Pop-Up Title</h2>
        <p>Ceci est le contenu de la pop-up.</p>
        <button @click="closePopUp">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    openPopUp() {
      this.isVisible = true;
    },
    closePopUp() {
      this.isVisible = false;
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 20px;
}
</style>
