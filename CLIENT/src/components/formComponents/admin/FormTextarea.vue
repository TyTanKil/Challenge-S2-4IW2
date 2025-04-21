<template>
    <div class="mb-6">
        <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <textarea :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :required="required"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring focus:ring-customGreen focus:border-customGreen color-dark"></textarea>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: String, required: true },
    required: { type: Boolean, default: false }
});

const emits = defineEmits(['update:modelValue']);
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  .color-dark {
      color: #575757;
  }
}
</style>

