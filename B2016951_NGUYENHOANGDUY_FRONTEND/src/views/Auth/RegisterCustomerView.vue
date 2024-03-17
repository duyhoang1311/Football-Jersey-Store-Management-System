<template>
    <div class="register-banner">
        <div class="container">
            <form class="needs-validation register-form p-2" @submit.prevent="register" novalidate>
                <div class="form-row">
                    <div class="col-12 text-center register-title">Đăng Ký</div>
                    <div class="col-md-12 mb-3">
                        <label>Họ Tên Khách Hàng</label>
                        <input v-model="HoTenKH" type="text" class="form-control" required />
                        <div class="invalid-feedback">Tên nhập chưa đúng</div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label>Địa chỉ</label>
                        <input v-model="DiaChi" type="text" class="form-control" required />
                        <div class="invalid-feedback">Địa chỉ nhập chưa đúng</div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label>Số điện thoại</label>
                        <input v-model="SoDienThoai" type="text" class="form-control" required />
                        <div class="invalid-feedback">Số điện thoại nhập chưa đúng</div>
                    </div>
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
                    <button class="btn btn-primary mx-auto" type="submit">Đăng Ký</button>
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

export default {
    name: 'khach-register',
    data() {
        return {
            HoTenKH: '',
            DiaChi: '',
            SoDienThoai: '',
            Email: '',
            Password: '',
        };
    },
    methods: {
        async register() {
            try {
                const userData = {
                    HoTenKH: this.HoTenKH,
                    DiaChi: this.DiaChi,
                    SoDienThoai: this.SoDienThoai,
                    Email: this.Email,
                    Password: this.Password,
                };

                // Gọi hàm đăng nhập từ service
                const result = await KhachHangService.KhachHangDKy(userData);
                
                // Xử lý kết quả từ backend (result)
                console.log('result', result);

                if(result.success == true){
                    this.$router.push('/khach-hang/dang-nhap')
                }
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error during login:', error);
            }
        },
    },
};
</script>
