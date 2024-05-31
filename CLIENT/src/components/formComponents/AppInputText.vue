<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  isNeeded: Boolean,
  hideContent: Boolean,
});
</script>

<template>
  <div class="inputText">
    <label :for="props.label">
      {{ props.label }}
      <span v-if="props.isNeeded">*</span>
    </label>        
    <input :type="props.hideContent ? 'password' : 'text'" :id="props.label" :placeholder="props.placeholder"> 
  </div>
</template>

<style>
/* Style du input */
.inputText {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  width: 80%;
  
  input{
    border: none;
    background-color: #d9d9d9;
    padding: 0.5rem;
    border-radius: 5px;
    min-width: 10rem;
  }
  span{
    color: red;
  }
}

</style>

