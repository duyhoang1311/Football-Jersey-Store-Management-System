<script setup>
import AppHeader from '../components/AppHeader.vue';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '../stores/store';
import DatHangService from '../services/DatHang.service';
import HangHoaService from '../services/HangHoa.service';
import moment from 'moment';

const authStore = useAuthStore();
const KhachHangMSKH = authStore.checkKhachHang.MSKH;
console.log('authStore', authStore);

console.log('accessToken', authStore.accessToken);
console.log('KhachHangMSKH', KhachHangMSKH);

const getHangHoa = async (MSHH) => {
    try {
        const hangHoa = await HangHoaService.layHangHoaByMSHH(MSHH);
        return hangHoa.checkedHangHoa; // Trả về thông tin sản phẩm từ MSHH
    } catch (error) {
        console.error('Không thể lấy thông tin sản phẩm', error);
    }
};

const getListDonHang = async () => {
    try {
        const listDonHang = await DatHangService.getDonHangByMSKH(KhachHangMSKH);
        state.listDonHang = listDonHang.CheckedDonHang;
        console.log('state.listDonHang', state.listDonHang);

        for (const donHang of state.listDonHang) {
            for (const chiTiet of donHang.ChiTiet) {
                const hangHoa = await getHangHoa(chiTiet.MSHH);
                chiTiet.hangHoa = hangHoa;
                console.log('chiTiet.hangHoa', chiTiet.hangHoa);
                console.log('state.listDonHang2', state.listDonHang);
            }
        }
    } catch (error) {
        console.log('Không thể lấy danh sách đơn hàng', error);
    }
};

const getColumnWidth = (percentage) => {
    return {
        width: `${percentage}%`,
    };
};

const getImageUrl = (hangHoa) => {
    return hangHoa.images && hangHoa.images.length > 0
        ? `http://localhost:3000/api/hang-hoa/image/${hangHoa.images[0].TenHinh.split('\\')[1]}`
        : '';
};

const formatGia = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const formatNgay = (ngay) => {
    return moment(ngay).format('DD/MM/YYYY');
};

const state = reactive({
    listDonHang: [],
});

onMounted(() => {
    getListDonHang();
});
</script>

<template>
    <AppHeader />
    <div class="background pb-5 py-3">
        <h3 class="m-3 pt-1 pl-5 head-title">Danh Sách Đơn Hàng Đã Đặt</h3>
        <div v-for="(donHang, index) in state.listDonHang" :key="index">
            <div class="container">
                <div class="d-flex justify-content-between pt-3">
                    <h4>Đơn hàng {{ index + 1 }}</h4>
                    <b>Ngày đặt: {{ formatNgay(donHang.NgayDH) }}</b>
                </div>
                <div class="d-flex justify-content-between pt-3">
                    <h5>
                        Trạng thái:
                        <span v-if="donHang.TrangThaiDH === 'Đã xử lý'" class="h5">
                            Đã xử lý <i class="fa-solid fa-check" style="color: #12d933"></i>
                        </span>
                        <span v-else class="h5">Chưa xử lý <i class="fa-solid fa-x" style="color: #ef0b0b"></i> </span>
                    </h5>
                    <b>Ngày giao: {{ donHang.NgayGH ? formatNgay(donHang.NgayGH) : 'Chưa xác định' }}</b>
                </div>
                <table class="table my-3">
                    <thead>
                        <tr>
                            <th scope="col" :style="getColumnWidth(20)">Sản phẩm</th>
                            <th scope="col" :style="getColumnWidth(40)"></th>
                            <th scope="col" :style="getColumnWidth(10)">Kích thước</th>
                            <th scope="col" :style="getColumnWidth(10)">Số lượng</th>
                            <th scope="col" :style="getColumnWidth(10)">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, chiTietIndex) in donHang.ChiTiet" :key="chiTietIndex">
                            <td>
                                <img
                                    v-if="item.hangHoa && item.hangHoa.images"
                                    :src="getImageUrl(item.hangHoa)"
                                    alt="hình hàng hóa"
                                />
                            </td>
                            <td class="h3">{{ item.hangHoa ? item.hangHoa.TenHH : 'Lỗi tên' }}</td>
                            <td class="h5">{{ item.Size }}</td>
                            <td class="h5">{{ item.SoLuong }}</td>
                            <td class="h5">{{ item.hangHoa ? formatGia(item.hangHoa.Gia) : 'Lỗi giá' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
