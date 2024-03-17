<script setup>
import AppHeaderAdmin from '../components/AppHeaderAdmin.vue';
import { useStaffStore } from '../stores/staff';
import DatHangService from '../services/DatHang.service';
import HangHoaService from '../services/HangHoa.service';
import { onMounted, reactive } from 'vue';

const staffStore = useStaffStore();
console.log('authStore', staffStore);

console.log('NhanVien', staffStore.checkNhanVien);

const state = reactive({
    listDonHangDone: [],
    listHangHoa: [],
    tongDoanhThu: 0,
    tongSoLuongHang: 0,
});

const getTongDoanhThu = async () => {
    try {
        const listDonHangDone = await DatHangService.getThongKe();
        state.listDonHangDone = listDonHangDone.checkedDonHangDone;

        // Tính tổng doanh thu
        state.tongDoanhThu = state.listDonHangDone.reduce((total, donHang) => {
            return total + donHang.TongChiPhi;
        }, 0);

        console.log('state.listDonHangDone', state.listDonHangDone);
    } catch (error) {
        console.error('Loi lay danh sach don da duyet:', error);
    }
};

const getListHangHoa = async () => {
    try {
        const listHangHoa = await HangHoaService.getAllHangHoa();
        state.listHangHoa = listHangHoa.listHangHoa;

        state.tongSoLuongHang = state.listHangHoa.reduce((total, hangHoa) => {
            return total + hangHoa.SoLuongHang;
        }, 0);

        console.log('state.listHangHoa', state.listHangHoa);
    } catch (error) {
        console.error('Loi lay danh sach hang hoa:', error);
    }
};

const formatGia = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

onMounted(() => {
    getTongDoanhThu();
    getListHangHoa();
});
</script>

<template>
    <AppHeaderAdmin />
    <div class="container mt-5">
        <h1 class="mb-4 head-title">Thống Kê</h1>

        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body d-flex justify-content-center">
                        <div class="rounded-circle bg-secondary number-circle">
                            <p class="card-text">{{ state.listDonHangDone.length }}</p>
                        </div>
                    </div>
                    <h5 class="card-title text-center">Số đơn hàng đã xử lý</h5>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body d-flex justify-content-center">
                        <div class="rounded-circle bg-secondary number-circle">
                            <p class="card-text">{{ formatGia(state.tongDoanhThu) }}</p>
                        </div>
                    </div>
                    <h5 class="card-title  text-center">Tổng doanh thu</h5>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body d-flex justify-content-center">
                        <div class="rounded-circle bg-secondary number-circle">
                            <p class="card-text">{{ state.tongSoLuongHang }}</p>
                        </div>
                    </div>
                    <h5 class="card-title  text-center">Tổng số lượng hàng trong kho</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.number-circle {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    border-radius: 50%;
}
</style>
