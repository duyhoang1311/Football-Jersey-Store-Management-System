<script setup>
import AppHeaderAdmin from '../components/AppHeaderAdmin.vue';
import { onMounted, reactive } from 'vue';
import Swal from 'sweetalert2';
import KhachHangService from '../services/KhachHang.service';
import { useStaffStore } from '../stores/staff';
import moment from 'moment';

const state = reactive({
    listKhachHang: [],
    ngayChon: {},
});

const staffStore = useStaffStore();
const NhanVienMSNV = staffStore.MSNV;

const getlistKhachHang = async () => {
    try {
        const listKhachHang = await KhachHangService.getAllKhach();
        state.listKhachHang = listKhachHang.listKhachHang;
        console.log('state.listKhachHang', state.listKhachHang);
    } catch (error) {
        console.error('Error fetching danh sach khach hang:', error);
    }
};

const formatNgay = (ngay) => {
    return moment(ngay).format('DD/MM/YYYY');
};

onMounted(() => {
    getlistKhachHang();
});
</script>

<template>
    <div>
        <AppHeaderAdmin />
        <div class="background pb-5 py-3">
            <div class="d-flex justify-content-between px-5">
                <h3 class="mb-3 pt-2 head-title">Danh Sách Khách Hàng</h3>
            </div>
            <div class="container py-2">
                <table class="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Mã Số Khách Hàng</th>
                            <th scope="col">Họ và Tên</th>
                            <th scope="col">Số Điện Thoại</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(khachHang, index) in state.listKhachHang" :key="index">
                            <td>{{ khachHang.MSKH }}</td>
                            <td>{{ khachHang.HoTenKH }}</td>
                            <td>{{ khachHang.SoDienThoai }}</td>
                            <td>{{ khachHang.DiaChi }}</td>
                            <td>{{ khachHang.Email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
