<template>
  <div>
    <button @click="openPopUp">Ouvrir la Pop-Up</button>
    
    <div v-if="isVisible" class="popup-overlay" @click="handleOverlayClick">
      <div class="popup">
        <h1>{{ title }}</h1>
        <slot></slot>
        <button @click="closePopUp">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    openPopUp() {
      this.isVisible = true;
    },
    closePopUp() {
      this.isVisible = false;
    },
    handleOverlayClick(event) {
      if (event.target === event.currentTarget) {
        this.closePopUp();
      }
    },
  },
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
  color: black;
}

button {
  margin-top: 20px;
}
</style>
