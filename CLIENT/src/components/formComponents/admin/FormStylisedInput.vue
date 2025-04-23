<template>
    <div class="mb-6">
        <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <QuillEditor
            theme="snow"
            :toolbar="toolbar"
            :id="id"
            :required="required"
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, required: true },
    required: { type: Boolean, default: false },
    toolbar: { type: String, default: 'minimal' },
});

const emits = defineEmits(['update:modelValue']);
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
