<template>
    <div>
        <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <input
            type="date"
            :id="id"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :required="required"
            :min="datemin || ''"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring focus:ring-customGreen focus:border-customGreen"
        />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    id: String,
    label: String,
    modelValue: String,
    required: { type: Boolean, default: false },
    datemin: String,
});
</script>
