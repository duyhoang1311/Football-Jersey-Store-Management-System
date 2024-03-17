<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark sticky-top py-0">
            <div class="container px-0">
                <router-link class="navbar-brand brand-title my-3 h1 font-weight-bold" to="/"> HD Sport </router-link>
                <div class="d-flex justify-content-end heading-right">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <router-link
                                    v-if="KhachHang"
                                    class="nav-link"
                                    :to="'/khach-hang/don-hang/' + 'MSKH=' + KhachHang.MSKH"
                                    >Đơn Hàng</router-link
                                >
                            </li>
                            <li class="nav-item active">
                                <router-link class="nav-link" to="/khach-hang/gio-hang"> Giỏ Hàng </router-link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div v-if="accessToken && KhachHang" class="d-flex justify-content-end">
                            <p class="mr-1 pt-3 text-white">Hi, {{ KhachHang.HoTenKH }} !</p>
                            <div class="dropdown pt-2">
                                <button class="btn dropdown-user-icon" type="button" data-toggle="dropdown">
                                    <i class="fa-solid fa-user"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" @click="logout">Đăng Xuất</a>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <button class="btn btn-success mr-2" @click="login">Đăng Nhập</button>
                            <button class="btn btn-success" @click="register">Đăng Ký</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/store';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const KhachHang = computed(() => authStore.checkKhachHang);
console.log('KhachHang in AppHeader:', KhachHang.value);

const accessToken = computed(() => authStore.accessToken);
console.log('accessToken in AppHeader:', accessToken.value);

const logout = async () => {
    try {
        await authStore.logout().then(() => router.push('/khach-hang/dang-nhap'));
    } catch (error) {
        console.log('lỗi không đăng xuất', error);
    }
};

const login = () => {
    router.push('/khach-hang/dang-nhap');
};

const register = () => {
    router.push('/khach-hang/dang-ky');
};
</script>
