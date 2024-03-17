<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark sticky-top py-0">
            <div class="container px-0">
                <router-link class="navbar-brand brand-title my-3 h1 font-weight-bold" to="/admin">
                    HD Sport <span class="h3 font-weight-bold" style="color: #ffe300">ADMIN</span></router-link
                >
                <div class="d-flex justify-content-end heading-right">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <router-link class="nav-link" to="/admin/danh-sach-khach-hang"
                                    >Danh sách khách hàng</router-link
                                >
                            </li>
                            <li class="nav-item active">
                                <router-link class="nav-link" to="/admin/kho-hang">Quản Lý Kho</router-link>
                            </li>
                            <li class="nav-item active">
                                <router-link class="nav-link" to="/admin/duyet-don-dat-hang"
                                    >Duyệt Đơn Hàng</router-link
                                >
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex">
                        <div>
                            <p class="mr-1 pt-3 text-white">Hi, {{ NhanVien.HoTenNV }} !</p>
                        </div>
                        <div class="dropdown pt-2">
                            <button class="btn dropdown-user-icon" type="button" data-toggle="dropdown">
                                <i class="fa-solid fa-user"></i>
                            </button>

                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Đăng Xuất</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { useStaffStore } from '../stores/staff';

const staffStore = useStaffStore();
const NhanVien = staffStore.checkNhanVien;
console.log('authStore', staffStore);

console.log('NhanVien in AppHeaderAdmin', staffStore.checkNhanVien);
</script>
