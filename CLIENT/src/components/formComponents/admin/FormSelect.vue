<template>
    <div>
        <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <select :id="id" v-model="internalModelValue" @change="$emit('update:modelValue', internalModelValue)"
            :required="required" :multiple="multiple" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    id: String,
    label: String,
    options: Array,
    modelValue: [String, Array],
    required: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false }
});

const internalModelValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    internalModelValue.value = newValue;
});
</script>
