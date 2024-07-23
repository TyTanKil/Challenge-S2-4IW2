<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  isNeeded: Boolean,
  lines: String
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="inputText">
    <label :for="props.label">
      {{ props.label }}
      <span v-if="props.isNeeded">*</span>
    </label>
    <textarea
        :id="props.label"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        :rows="props.lines"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.inputText {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  width: 80%;
}

textarea {
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
