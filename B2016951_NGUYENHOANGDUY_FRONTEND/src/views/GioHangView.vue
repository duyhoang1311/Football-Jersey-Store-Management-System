<script setup>
import AppHeader from '../components/AppHeader.vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/store';
import DatHangService from '../services/DatHang.service';
import { computed } from 'vue';

const gioHang = computed(() => cartStore.getGioHang);
onMounted(() => {
    console.log('GioHangView is mounted');
    console.log('cartStore.gioHang', cartStore.getGioHang);
});

const cartStore = useCartStore();
const authStore = useAuthStore();
const KhachHang = authStore.checkKhachHang;
const GioHang = cartStore.getGioHang;

console.log('KhachHang', KhachHang);
console.log('GioHang', GioHang);

const router = useRouter();

const getImageUrl = (hangHoa) => {
    return hangHoa.images && hangHoa.images.length > 0
        ? `http://localhost:3000/api/hang-hoa/image/${hangHoa.images[0].TenHinh.split('\\')[1]}`
        : '';
};

const formatGia = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const getColumnWidth = (percentage) => {
    return {
        width: `${percentage}%`,
    };
};

const removeFromCart = (index) => {
    cartStore.removeFromCart(index);
};

const tongChiPhi = () => {
    const result = cartStore.getGioHang.reduce((total, item) => total + item.totalPrice, 0);
    return result;
};

const themDonDatHang = async () => {
    try {
        const isConfirmed = await Swal.fire({
            title: 'Xác nhận đặt hàng',
            text: 'Bạn có chắc muốn đặt hàng không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        });

        if (isConfirmed.isConfirmed) {
            const donDatHangData = {
                MSKH: KhachHang.MSKH,
                ChiTiet: GioHang.map((item) => ({
                    MSHH: item.hangHoa.MSHH,
                    Size: item.selectedSize,
                    SoLuong: item.quantity,
                })),
            };
            console.log('donDatHangData', donDatHangData);
            const result = await DatHangService.taoDonDatHang(donDatHangData);
            console.log('result', result);

            if (result.success == true) {
                await Swal.fire({
                    title: 'Đặt hàng thành công!',
                    text: 'Vui lòng chờ cửa hàng duyệt!',
                    icon: 'success',
                }).then(() => {
                    cartStore.removeAll();
                    router.push('/');
                });
            }
        }
    } catch (error) {
        console.log('error', error);
    }
};
</script>

<template>
    <AppHeader />
    <div class="background pb-5 py-3">
        <div class="container">
            <h3 class="my-3 pt-3 head-title">Danh Sách Sản Phẩm</h3>
            <table class="table my-3">
                <thead>
                    <tr>
                        <th scope="col" :style="getColumnWidth(20)">Sản phẩm</th>
                        <th scope="col" :style="getColumnWidth(40)"></th>
                        <th scope="col" :style="getColumnWidth(10)">Kích thước</th>
                        <th scope="col" :style="getColumnWidth(10)">Số lượng</th>
                        <th scope="col" :style="getColumnWidth(10)">Giá</th>
                        <th scope="col" :style="getColumnWidth(10)">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in gioHang" :key="index">
                        <td>
                            <img
                                v-if="item.hangHoa && item.hangHoa.images"
                                :src="getImageUrl(item.hangHoa)"
                                alt="hình hàng hóa"
                            />
                        </td>
                        <td class="h3">{{ item.hangHoa.TenHH }}</td>
                        <td class="h5">{{ item.selectedSize }}</td>
                        <td class="h5">{{ item.quantity }}</td>
                        <td class="h5">{{ formatGia(item.totalPrice) }}</td>
                        <td><button class="btn btn-danger" @click="removeFromCart(index)">Xóa</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="KhachHang" class="container">
            <div class="line"></div>
            <div>
                <h5 class="text-danger my-2">
                    <i class="fa-solid fa-location-dot" style="color: #ed0707"></i> Địa chỉ nhận hàng
                </h5>
                <div class="row">
                    <div class="col-3">
                        <b >{{ KhachHang.HoTenKH }}</b>
                        <br /><b>{{ KhachHang.SoDienThoai }}</b>
                    </div>
                    <div class="col-9" >{{ KhachHang.DiaChi }}</div>
                </div>
                <h5 class="my-2" style="color: #9a8518">
                    <i class="fa-solid fa-wallet" style="color: #9a8518"></i> Phương thức thanh toán
                </h5>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                    />
                    <label class="form-check-label" for="exampleRadios1">
                        Giao hàng tận nơi - Thanh toán khi nhận hàng (COD)
                    </label>
                </div>
            </div>
            <div class="d-flex flex-row-reverse bd-highlight py-2">
                <button
                    class="btn-buying"
                    @click="
                        () => {
                            console.log('Button clicked');
                            themDonDatHang();
                        }
                    "
                >
                    Mua Hàng
                </button>
                <h5 class="p-2">Tổng thanh toán: {{ formatGia(tongChiPhi()) }}</h5>
            </div>
        </div>
        <div v-else class="text-warning text-center h2">Hãy đăng nhập để đặt hàng!</div>
    </div>
</template>
