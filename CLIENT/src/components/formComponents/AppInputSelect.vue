<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  isNeeded: Boolean,
  options: Array,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="inputSelect">
    <label :for="props.label">
      {{ props.label }}
      <span v-if="props.isNeeded">*</span>
    </label>        
    <select :id="props.label" :value="props.modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.inputSelect {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  width: 80%;
}

label {
  margin-bottom: 0.5rem;
}

select {
  border: none;
  background-color: #d9d9d9;
  padding: 0.5rem;
  border-radius: 5px;
  min-width: 10rem;
}

span {
  color: red;
}
</style>
