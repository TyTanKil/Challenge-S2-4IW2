<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: String,
  isNeeded: Boolean,
});
</script>

<template>
  <div class="inputDate">
    <label :for="props.label">
      {{ props.label }}
      <span v-if="props.isNeeded">*</span>
    </label>        
    <input :id="props.label" type="date"> 
  </div>
</template>

<style>
/* Style du input */
.inputDate {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  width: 80%;
  input{
    border: none;
    background-color: #d9d9d9;
    padding: 0.5rem;
    border-radius: 5px;
    width: 25%;
  }
  span{
    color: red;
  }
}
</style>

