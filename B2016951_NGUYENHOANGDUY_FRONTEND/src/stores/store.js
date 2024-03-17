import { defineStore } from 'pinia';
import KhachHangService from '../services/KhachHang.service'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        checkKhachHang: null,
    }),
    getters: {
        accessToken: (state) =>
            state.accessToken || localStorage.getItem('accessToken')
                ? JSON.parse(localStorage.getItem('accessToken'))
                : null,
        checkKhachHang: (state) =>
            state.checkKhachHang || localStorage.getItem('KhachHang')
                ? JSON.parse(localStorage.getItem('KhachHang'))
                : null,
    },
    actions: {
        setAccessToken(token) {
            console.log(token);
            this.$state.accessToken = token;
            localStorage.setItem('accessToken', JSON.stringify(token));
        },
        setCheckKhachHang(checkKhachHang) {
            this.$state.checkKhachHang = checkKhachHang;
            localStorage.setItem('KhachHang', JSON.stringify(checkKhachHang));
        },

        async logout() {
            try {
                // await KhachHangService.KhachHangDXuat();
                this.$state.accessToken = null;
                this.$state.checkKhachHang = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('KhachHang');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        },
    },
});

// export default pinia;
