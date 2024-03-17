// Trong store.js
import { createStore } from 'vuex';

const getDefaultState = () => {
    return {
        accessToken: localStorage.getItem('accessToken') || null,
        checkKhachHang: JSON.parse(localStorage.getItem('KhachHang')) || {},
    };
};

export default createStore({
    state: getDefaultState(),
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token;
        },
        setKhachHang(state, KhachHang) {
            state.checkKhachHang = KhachHang;
        },
        // Các mutations khác nếu cần
    },
    actions: {
        setAccessTokenAndKhachHang({ commit }, { accessToken, KhachHang }) {
            // Lưu vào localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('KhachHang', JSON.stringify(KhachHang));

            // Sau đó, cập nhật store
            commit('setAccessToken', accessToken);
            commit('setKhachHang', KhachHang);
        },
        // Các actions nếu cần
    },
    getters: {
        accessToken: state => state.accessToken,
        checkKhachHang: state => state.checkKhachHang,
    },
});
