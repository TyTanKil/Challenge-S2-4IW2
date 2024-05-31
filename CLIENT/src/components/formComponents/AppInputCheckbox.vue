<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: String,
  isNeeded: Boolean,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="inputCheckbox">
    <label :for="props.label">
      {{ props.label }}
      <span v-if="props.isNeeded">*</span>
    </label>        
    <input 
    :id="props.label"
    type="checkbox"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"> 
  </div>
</template>

<style>
/* Style du input */
.inputCheckbox {
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
  width: 80%;
  min-width: 10rem;
  input{
    border: none;
    background-color: #d9d9d9;
    padding: 0.5rem;
    border-radius: 5px;
    margin-left: 1rem;
    ::placeholder{
        color: red;
    }
  }
  span{
    color: red;
  }
}

</style>

