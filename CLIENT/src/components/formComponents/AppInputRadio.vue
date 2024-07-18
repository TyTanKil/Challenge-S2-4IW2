<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  isNeeded: Boolean,
  options: Array(Object),
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="radio-button">
    <label :for="props.label">
      {{ props.label }}
      <span v-if="props.isNeeded">*</span>
    </label>
    <div class="radio-group">
      <div class="radio-option" v-for="option in props.options" :key="option.value">
        <input
          type="radio"
          :id="props.label + '-' + option.value"
          :value="option.value"
          :name="option.label"
          :checked="props.modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
        />
        <label :for="props.label + '-' + option.value">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.radio-button {
  margin: 0.5rem;
  width: 80%;
}

.radio-button span {
  color: red;
}

.radio-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.radio-option label {
  font-size: 18px;
}

/* Agrandir les boutons radio */
input[type="radio"] {
  width: 25px;
  height: 25px;
}
</style>
