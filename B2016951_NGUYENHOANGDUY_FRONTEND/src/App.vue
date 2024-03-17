<template>
    <div id="app"><router-view /></div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppContainer from '@/components/AppContainer.vue';
import HangHoaModal from '@/components/HangHoaModal.vue';
import LoginCustomerView from '@/views/Auth/LoginCustomerView.vue';
import RegisterCustomerView from '@/views/Auth/RegisterCustomerView.vue';
import GioHangView from '@/views/GioHangView.vue';
import AdminHomeView from '@/views/AdminHomeView.vue';
export default {
    components: {
        AppHeader,
        AppContainer,
        LoginCustomerView,
        RegisterCustomerView,
        GioHangView,
        HangHoaModal,
        AdminHomeView,
    },
    data() {
        return {
            showHeader: true,
        };
    },
    watch: {
        $route(to, from) {
            if (to.name === 'khach-login') {
                this.showHeader = false;
            } else {
                this.showHeader = true;
            }
            if (to.name === 'khach-register') {
                this.showHeader = false;
            } else {
                this.showHeader = true;
            }
        },
    },
};
</script>

<style>
.page {
    max-width: 400px;
    margin: auto;
}
</style>
