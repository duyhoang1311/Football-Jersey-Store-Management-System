<script setup>
import AppHeader from '../components/AppHeader.vue';
import AppContainer from '../components/AppContainer.vue';
import { useAuthStore } from '../stores/store';

const authStore = useAuthStore();
console.log('authStore', authStore);

console.log('accessToken', authStore.accessToken);
console.log('KhachHang', authStore.checkKhachHang);
</script>

<template>
    <AppHeader />
    <AppContainer />
</template>
