<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  isNeeded: Boolean,
  hideContent: Boolean,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="inputText">
    <label :for="props.label">
      {{ props.label }}
      <span v-if="props.isNeeded">*</span>
    </label>        
    <input
        :type="props.hideContent ? 'password' : 'text'"
        :id="props.label"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    > 
  </div>
</template>

<style scoped>
.inputText {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  width: 80%;
}

input {
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
