<script setup>
import AppHeaderAdmin from '../components/AppHeaderAdmin.vue';
import { onMounted, reactive } from 'vue';
import Swal from 'sweetalert2';
import DatHangService from '../services/DatHang.service';
import { useStaffStore } from '../stores/staff';
import moment from 'moment';

const state = reactive({
    listDonHang: [],
    ngayChon: {},
});

const staffStore = useStaffStore();
const NhanVienMSNV = staffStore.MSNV;

const getListDonHang = async () => {
    try {
        const listDonHang = await DatHangService.getAllDonHang();
        state.listDonHang = listDonHang.listDonDatHang;
        console.log('state.listDonHang', state.listDonHang);
    } catch (error) {
        console.error('Error fetching danh sach don dat hang:', error);
    }
};

const formatNgay = (ngay) => {
    return moment(ngay).format('DD/MM/YYYY');
};

const duyetDonHang = async (soDonDH, msKH, ngayDat) => {
    const ngayChon = state.ngayChon[soDonDH];
    const staffStore = useStaffStore();
    const NhanVienMSNV = staffStore.checkNhanVien.MSNV;

    console.log('soDonDH', soDonDH, 'msKH', msKH, 'ngayChon', ngayChon, 'NhanVienMSNV', NhanVienMSNV.MSNV);

    if (ngayChon <= ngayDat) {
        Swal.fire('Ngày giao hàng không được nhỏ hơn ngày đặt hàng', '', 'error');
        return; 
    }

    const data = {
        MSNV: NhanVienMSNV,
        MSKH: msKH,
        SoDonDH: soDonDH,
        NgayGH: ngayChon,
    };
    try {
        await DatHangService.duyetDonDatHang(data);
        try {
            await Swal.fire('Duyệt thành công!', '', 'success');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log('lỗi duyệt đơn hàng', error);
    }
};

onMounted(() => {
    getListDonHang();
});
</script>

<template>
    <div>
        <AppHeaderAdmin />
        <div class="background pb-5 py-3">
            <div class="d-flex justify-content-between px-5">
                <h3 class="mb-3 pt-2 head-title">Danh Sách Đơn Hàng</h3>
            </div>
            <div class="container py-2">
                <table class="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Mã Số Đơn Hàng</th>
                            <th scope="col">Mã Số Khách Hàng</th>
                            <th scope="col">Ngày Đặt Hàng</th>
                            <th scope="col">Ngày Giao Hàng</th>
                            <th scope="col">Trạng Thái Đơn Hàng</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(donHang, index) in state.listDonHang" :key="index">
                            <td>{{ donHang.SoDonDH }}</td>
                            <td>{{ donHang.MSKH }}</td>
                            <td>{{ formatNgay(donHang.NgayDH) }}</td>
                            <td>
                                <template v-if="donHang.Duyet">
                                    {{ formatNgay(donHang.NgayGH) }}
                                </template>
                                <template v-else>
                                    <!-- Nếu chưa được duyệt, hiển thị date picker và nút Duyệt -->
                                    <input type="date" v-model="state.ngayChon[donHang.SoDonDH]" />
                                </template>
                            </td>
                            <td>{{ donHang.TrangThaiDH }}</td>
                            <td>
                                <template v-if="donHang.Duyet">
                                    <!-- Nếu đã được duyệt, hiển thị nút disable -->
                                    <button class="btn btn-success" :disabled="true">
                                        <i class="fa-solid fa-check" style="color: #ffffff"></i> Đã Duyệt
                                    </button>
                                </template>
                                <template v-else>
                                    <!-- Nếu chưa được duyệt, hiển thị date picker và nút Duyệt -->
                                    <button
                                        class="btn btn-danger"
                                        @click="duyetDonHang(donHang.SoDonDH, donHang.MSKH, donHang.NgayDH)"
                                    >
                                        <i class="fa-solid fa-check" style="color: #ffffff"></i> Duyệt
                                    </button>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
