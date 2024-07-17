<template>
    <div class="mb-6">
        <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <input :id="id" type="file" @change="handleFileUpload" accept="image/*" :required="required"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring focus:ring-customGreen focus:border-customGreen" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, required: true },
    required: { type: Boolean, default: false }
});

const emits = defineEmits(['update:modelValue']);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    emits('update:modelValue', file);
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
