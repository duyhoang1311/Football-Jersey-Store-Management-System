<script setup>
import AppHeaderAdmin from '../components/AppHeaderAdmin.vue';
import { useStaffStore } from '../stores/staff';
import HangHoaService from '../services/HangHoa.service';
import { onMounted, reactive } from 'vue';
import FormHangHoa from '../components/FormHangHoa.vue';
import Swal from 'sweetalert2';

const staffStore = useStaffStore();

const state = reactive({
    listKhoHangHoa: [],
    selectedHangHoa: null,
});

const getListHangHoa = async () => {
    try {
        const listHangHoa = await HangHoaService.getAllHangHoa();
        state.listKhoHangHoa = listHangHoa.listHangHoa;
        console.log('listHangHoa', listHangHoa);
        console.log('state.listKhoHangHoa', state.listKhoHangHoa);
    } catch (error) {
        console.log(error);
    }
};

const openFormHangHoa = (hangHoa) => {
    state.selectedHangHoa = hangHoa;
    console.log('state.selectedHangHoa', state.selectedHangHoa);
    $('#formHangHoa').modal('show');
};

const clearFormData = () => {
    state.selectedHangHoa = null;
};

const deleteHangHoa = async (value) => {
    try {
        const result = await Swal.fire({
            title: 'Bạn chắc chắn muốn xóa?',
            text: 'Hành động này sẽ không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            await HangHoaService.deleteHH(value);

            await Swal.fire('Xóa thành công!', '', 'success');
            window.location.reload();
        }
    } catch (error) {
        console.error('Lỗi khi xóa hàng hóa:', error);
        await Swal.fire('Đã xảy ra lỗi!', 'Vui lòng thử lại sau.', 'error');
    }
};

onMounted(() => {
    getListHangHoa();
});

const formatGia = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>

<template>
    <div>
        <AppHeaderAdmin />
        <div class="background pb-5 py-3">
            <div class="d-flex justify-content-between px-5">
                <h3 class="mb-3 pt-2 head-title">Danh Sách Hàng Hóa</h3>
                <button class="btn-add-product mb-2 mr-2" @click="openFormHangHoa(), clearFormData()">
                    <i class="fa-solid fa-plus fa-lg" style="color: #ffffff"></i> Thêm Sản Phẩm
                </button>
            </div>
            <div class="container py-2">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col-sm-2">Mã Số Hàng Hóa</th>
                            <th scope="col">Tên Hàng Hóa</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Loại Sản Phẩm</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(hangHoa, index) in state.listKhoHangHoa" :key="index">
                            <td>{{ hangHoa.MSHH }}</td>
                            <td>{{ hangHoa.TenHH }}</td>
                            <td>{{ formatGia(hangHoa.Gia) }}</td>
                            <td>{{ hangHoa.LoaiSanPham }}</td>
                            <td>
                                <button class="btn btn-success mr-1" @click="openFormHangHoa(hangHoa)">
                                    <i class="fa-solid fa-pen" style="color: #ffffff"></i> Sửa
                                </button>
                                <button class="btn btn-danger" @click="deleteHangHoa(hangHoa.MSHH)">
                                    <i class="fa-solid fa-trash" style="color: #ffffff"></i> Xóa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- Modal component -->
    <form-hang-hoa :hangHoa="state.selectedHangHoa" />
</template>
