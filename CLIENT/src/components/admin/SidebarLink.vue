<!-- SidebarLink.vue -->
<template>
    <router-link :to="href" class="w-full" custom v-slot="{ href, navigate, isActive }">
        <button @click="navigate" :class="[
            'middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize',
            isActive ? 'bg-customGreen text-black shadow-md hover:shadow-lg active:opacity-[0.85]' : 'text-white hover:bg-white/10 active:bg-white/30'
        ]" type="button">
            <svg :class="['w-5 h-5']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                aria-hidden="true">
                <path :d="icon"></path>
            </svg>
            <!-- <img :src="image" width="30px" height="30px"/> -->
            <p class="block antialiased font-sans text-base leading-relaxed font-medium">{{ label }}</p>
        </button>
    </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    href: string;
    icon: string;
    label: string;
}>();
</script>

<style scoped>
</style>
