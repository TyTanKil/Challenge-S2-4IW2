<template>
    <div class="mb-6">
        <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <input :type="type" :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :required="required"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring focus:ring-customGreen focus:border-customGreen" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    modelValue: { type: [String, Number], required: true },
    required: { type: Boolean, default: false }
});

const emits = defineEmits(['update:modelValue']);
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
