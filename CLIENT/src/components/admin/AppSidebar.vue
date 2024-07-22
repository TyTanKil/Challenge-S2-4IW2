<template>
    <div class="flex">
        <button @click="toggleSidebar" class="md:hidden p-4 fixed z-50 text-white bg-customGreen">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>

        <aside :class="[
            'fixed bg-customGray h-screen flex flex-col items-start p-5 transition-transform duration-300 md:relative md:translate-x-0',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]">
            <div class="text-white text-2xl font-bold mb-8">
                <h1 class="text-center">Admin</h1>
            </div>
            <nav class="flex flex-col gap-3 w-full">
                <SidebarLink href="/admin"
                    icon="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69zM12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"
                    label="Tableau de bord" />
                <SidebarLink href="/admin/users"
                    icon="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    label="Utilisateurs" />
                <SidebarLink href="/admin/products"
                    icon="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                    label="Produits" />
                <SidebarLink href="/admin/category"
                    icon="M3.375 3h17.25C21.164 3 22 3.836 22 4.875v14.25C22 20.164 21.164 21 20.625 21H3.375A1.875 1.875 0 011.5 19.125V4.875C1.5 3.836 2.336 3 3.375 3zm0 1.5A.375.375 0 003 4.875v14.25c0 .207.168.375.375.375h17.25a.375.375 0 00.375-.375V4.875A.375.375 0 0020.625 4.5H3.375zm6.375 5.25a.75.75 0 010-1.5h7.5a.75.75 0 010 1.5h-7.5zM10.5 13.5a.75.75 0 010-1.5h3.75a.75.75 0 010 1.5h-3.75zM7.5 7.5a.75.75 0 010-1.5h10.5a.75.75 0 010 1.5H7.5z"
                    label="Catégories" />
                <SidebarLink href="/admin/manufacturers"
                    icon="M12 2.25a.75.75 0 01.75.75v.75h2.25A2.25 2.25 0 0117.25 6v12.75A2.25 2.25 0 0115 21h-6a2.25 2.25 0 01-2.25-2.25V6A2.25 2.25 0 019 3.75h2.25V3a.75.75 0 01.75-.75zm.75 2.25v.75h-3v-.75h3zm-3 13.5h3v-3h-3v3zm0-4.5h3v-3h-3v3z"
                    label="Fabricants" />
                <SidebarLink href="/admin/order"
                    icon="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    label="Commandes" />
                <SidebarLink href="/"
                    icon="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                    label="Retour au site" />
            </nav>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidebarLink from './SidebarLink.vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
</style>
