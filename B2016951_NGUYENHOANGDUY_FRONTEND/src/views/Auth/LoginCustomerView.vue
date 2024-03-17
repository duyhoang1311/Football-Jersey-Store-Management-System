<template>
    <div class="login-banner">
        <div class="container">
            <form class="needs-validation login-form p-2" @submit.prevent="login" novalidate>
                <div class="form-row">
                    <div class="col-12 text-center login-title">Đăng Nhập</div>
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
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener(
        'load',
        function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
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

import KhachHangService from '../../services/KhachHang.service';
import { useAuthStore } from '../../stores/store';

export default {
    name: 'khach-login',
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
                const result = await KhachHangService.KhachHangDNhap(userData);

                // Lưu token vào store sử dụng mutation
                const authStore = useAuthStore();
                authStore.setAccessToken(result.accessToken);
                authStore.setCheckKhachHang(result.checkKhachHang);

                // Xử lý kết quả từ backend (result)
                console.log('result', result);
                console.log('result.accessToken', result.accessToken);

                if (result.success == true) {
                    await this.$router.push('/');
                    window.location.reload();
                }
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error during login:', error);
            }
        },
    },
};
</script>
