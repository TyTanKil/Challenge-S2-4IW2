<template>
    <div>
            <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
            <select :id="id" :required="required" :value="modelValue" @change="updateValue($event.target.value)"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring focus:ring-customGreen focus:border-customGreen">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: String,
    label: String,
    options: Array,
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
    emit('update:modelValue', value);
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
