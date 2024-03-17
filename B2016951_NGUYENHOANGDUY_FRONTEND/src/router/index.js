import { createWebHistory, createRouter } from 'vue-router';
import LoginCustomerView from '../views/Auth/LoginCustomerView.vue';
import RegisterCustomerView from '../views/Auth/RegisterCustomerView.vue';
import DonHangView from '../views/DonHangView.vue';
import GioHangView from '../views/GioHangView.vue';
import HomeView from '../views/HomeView.vue';
import LoginStaffView from '../views/Auth/LoginStaffView.vue';
import AdminHomeView from '../views/AdminHomeView.vue';
import KhoHangView from '../views/KhoHangView.vue';
import ListKhachHangView from '../views/ListKhachHangView.vue';
import DuyetDonHangView from '../views/DuyetDonHangView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/khach-hang/dang-nhap',
        name: 'KhachHang-login',
        component: LoginCustomerView,
    },
    {
        path: '/khach-hang/dang-ky',
        name: 'KhachHang-register',
        component: RegisterCustomerView,
    },
    {
        path: '/khach-hang/don-hang/:MSKH',
        name: 'KhachHang-don-hang',
        component: DonHangView,
    },
    {
        path: '/khach-hang/gio-hang',
        name: 'KhachHang-gio-hang',
        component: GioHangView,
    },
    {
        path: '/admin/dang-nhap',
        name: 'NhanVien-dang-nhap',
        component: LoginStaffView,
    },
    {
        path: '/admin/',
        name: 'NhanVien-home',
        component: AdminHomeView,
    },
    {
        path: '/admin/kho-hang',
        name: 'NhanVien-kho-hang',
        component: KhoHangView,
    },
    {
        path: '/admin/duyet-don-dat-hang',
        name: 'NhanVien-duyet-don-hang',
        component: DuyetDonHangView,
    },
    {
        path: '/admin/danh-sach-khach-hang',
        name: 'NhanVien-danh-sach-khach-hang',
        component: ListKhachHangView,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
