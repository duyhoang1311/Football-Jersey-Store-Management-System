<template>
    <div class="login-banner">
        <div class="container">
            <form class="needs-validation login-form p-2" @submit.prevent="login" novalidate>
                <div class="form-row">
                    <h1 class="col-12 text-center login-title login-staff py-2">HS Sport's Staff</h1>
                    <h5 class="col-12 text-center login-title">Đăng Nhập</h5>
                    <div class="col-md-12 mb-3">
                        <label>Email</label>
                        <input v-model="Email" type="email" class="form-control" required />
                        <div class="invalid-feedback">Email nhập chưa đúng</div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label>Mật khẩu</label>
                        <input v-model="Password" type="password" class="form-control" required />
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-primary mx-auto" type="submit">Đăng Nhập</button>
                    <div class="mt-2">
                        Chưa có tài khoản? <router-link to="/khach-hang/dang-ky"><button>Đăng Ký</button></router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
(function () {
    'use strict';
    window.addEventListener(
        'load',
        function () {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener(
                    'submit',
                    function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    },
                    false,
                );
            });
        },
        false,
    );
})();

import NhanVienService from '../../services/NhanVien.service';
import { useStaffStore } from '../../stores/staff';

export default {
    data() {
        return {
            Email: '',
            Password: '',
        };
    },
    methods: {
        async login() {
            try {
                const userData = {
                    Email: this.Email,
                    Password: this.Password,
                };

                // Gọi hàm đăng nhập từ service
                const result = await NhanVienService.NhanVienDNhap(userData);
                console.log('result', result);
                console.log('result', result.checkNhanVien);
                // Lưu token vào store sử dụng mutation
                const staffStore = useStaffStore();
                staffStore.setCheckNhanVien(result.checkNhanVien);
                console.log('staffStore.checkNhanVien', staffStore.checkNhanVien);
                // Xử lý kết quả từ backend (result)

                if (result.success == true) {
                    this.$router.push('/admin/');
                }
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error during login:', error);
            }
        },
    },
};
</script>
