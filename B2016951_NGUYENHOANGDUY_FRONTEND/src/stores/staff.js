import { defineStore } from 'pinia';

export const useStaffStore = defineStore('staff', {
    state: () => ({
        checkNhanVien: null,
    }),
    getters: {
        checkNhanVien: (state) =>
            state.checkNhanVien || localStorage.getItem('NhanVien')
                ? JSON.parse(localStorage.getItem('NhanVien'))
                : null,
    },
    actions: {
        setCheckNhanVien(checkNhanVien) {
            this.$state.checkNhanVien = checkNhanVien;
            localStorage.setItem('NhanVien', JSON.stringify(checkNhanVien));
        },
    },
});

// export default pinia;
