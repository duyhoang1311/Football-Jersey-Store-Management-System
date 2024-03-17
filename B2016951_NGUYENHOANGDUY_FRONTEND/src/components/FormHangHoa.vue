<template>
    <div class="modal fade" id="formHangHoa" role="dialog" aria-labelledby="hangHoaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center">
                    <h3 class="modal-title" id="hangHoaModalLabel">Thông Tin Chi Tiết</h3>
                </div>
                <div class="modal-body">
                    <form v-if="hangHoa">
                        <div class="form-row">
                            <div class="col">
                                <label>Hình ảnh</label>
                                <input
                                    type="file"
                                    class="form-control col-6"
                                    @change="handleFileChange"
                                    v-if="showFileInput"
                                />

                                <div v-if="hangHoa && hangHoa.images && hangHoa.images.length > 0">
                                    <p v-for="(imageName, index) in hangHoa.images" :key="index">
                                        {{ imageName.TenHinh }}
                                        <button @click="removeImage(index)">Xóa</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput">Tên sản phẩm</label>
                            <input
                                v-if="hangHoa"
                                v-model="hangHoa.TenHH"
                                type="text"
                                class="form-control"
                                id="formGroupExampleInput"
                                placeholder="Example input placeholder"
                            />
                        </div>
                        <div class="form-group col-md-4 p-0">
                            <label for="inputState">Câu lạc bộ</label>
                            <select id="inputState" class="form-control">
                                <option selected v-if="hangHoa">{{ hangHoa.DoiBong }}</option>
                                <option>Inter Miami</option>
                                <option>Barcelona</option>
                            </select>
                        </div>
                        <fieldset class="form-group d-flex justify-content-between">
                            <label class="col-form-label pt-0">Loại sản phẩm</label>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    value="Áo bóng đá"
                                    v-if="hangHoa !== null"
                                    :checked="hangHoa && hangHoa.LoaiSanPham === 'Áo bóng đá'"
                                    @change="updateLoaiSanPham('Áo bóng đá')"
                                />
                                <label class="form-check-label" for="gridRadios1">Áo bóng đá</label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    value="Áo khoác"
                                    v-if="hangHoa !== null"
                                    :checked="hangHoa && hangHoa.LoaiSanPham === 'Áo khoác'"
                                    @change="updateLoaiSanPham('Áo khoác')"
                                />
                                <label class="form-check-label" for="gridRadios2">Áo khoác</label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    value="Áo thun"
                                    v-if="hangHoa !== null"
                                    :checked="hangHoa && hangHoa.LoaiSanPham === 'Áo thun'"
                                    @change="updateLoaiSanPham('Áo thun')"
                                />
                                <label class="form-check-label" for="gridRadios3">Áo thun</label>
                            </div>
                        </fieldset>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Giá</label>
                            <div class="col-sm-4">
                                <input type="number" class="form-control" :value="hangHoa ? hangHoa.Gia : null" />
                            </div>
                        </div>
                        <h3 class="col-form-label font-weight-bold">Bảng kích thước:</h3>
                        <div class="form-group row pl-4">
                            <div v-if="hangHoa" v-for="(size, index) in hangHoa.sizes" :key="index" class="mx-1">
                                <label :for="`size${size.Size}`">{{ size.Size }}:</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    :id="`size${size.Size}`"
                                    v-if="hangHoa"
                                    v-model="size.SoLuongSize"
                                />
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary" @click="capNhatHangHoa" v-if="hangHoa">
                                Cập nhật
                            </button>
                        </div>
                    </form>
                    <form v-else>
                        <!-- Nội dung form cho thêm mới hàng hóa -->
                        <div class="form-row">
                            <div class="col">
                                <label>Hình ảnh</label>
                                <input type="file" class="form-control col-6" @change="handleFileChange" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput">Tên sản phẩm</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Nhập tên sản phẩm"
                                v-model="newHangHoa.TenHH"
                            />
                        </div>
                        <div class="form-group col-md-4 p-0">
                            <label for="inputState">Câu lạc bộ</label>
                            <select id="inputState" class="form-control" v-model="newHangHoa.DoiBong">
                                <option selected>Manchester United</option>
                                <option>Inter Miami</option>
                                <option>Barcelona</option>
                                <option>Real Madrid</option>
                                <option>Arsenal</option>
                            </select>
                        </div>
                        <fieldset class="form-group d-flex justify-content-between">
                            <label class="col-form-label pt-0">Loại sản phẩm</label>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    value="Áo bóng đá"
                                    v-model="newHangHoa.LoaiSanPham"
                                />
                                <label class="form-check-label">Áo bóng đá</label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    value="Áo khoác"
                                    v-model="newHangHoa.LoaiSanPham"
                                />
                                <label class="form-check-label">Áo khoác</label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    value="Áo thun"
                                    v-model="newHangHoa.LoaiSanPham"
                                />
                                <label class="form-check-label">Áo thun</label>
                            </div>
                        </fieldset>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Giá</label>
                            <div class="col-sm-4">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Nhập giá tiền"
                                    v-model="newHangHoa.Gia"
                                />
                            </div>
                        </div>
                        <h3 class="col-form-label font-weight-bold">Bảng kích thước:</h3>
                        <div class="form-group row pl-4">
                            <div
                                v-for="(size, index) in newHangHoa.sizes"
                                :key="index"
                                class="px-2"
                                style="width: 150px"
                            >
                                <label :for="`size${size.Size}`">{{ size.Size }}:</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    :id="`size${size.Size}`"
                                    v-model="size.SoLuongSize"
                                />
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary" @click="themMoiHangHoa">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { useCartStore } from '../stores/cart';
import HangHoaService from '../services/HangHoa.service';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
    props: {
        hangHoa: Object,
    },
    setup() {
        const router = useRouter();

        return {
            router,
        };
    },
    data() {
        const selectedFile = ref(null);

        return {
            newHangHoa: {
                images: [],
                sizes: [
                    { Size: 'S', SoLuongSize: 0 },
                    { Size: 'M', SoLuongSize: 0 },
                    { Size: 'L', SoLuongSize: 0 },
                    { Size: 'XL', SoLuongSize: 0 },
                ],
            },
            selectedFile,
            showFileInput: true,
        };
    },
    methods: {
        formatGia(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        removeImage(index) {
            if (this.hangHoa) {
                this.newHangHoa.images.splice(index, 1);
            }
            this.showFileInput = true;
        },
        async capNhatHangHoa() {
            console.log('Đã nhấn nút Cập nhật');

            try {
                const updateHangHoa = await HangHoaService.updateHH(this.hangHoa.MSHH, {
                    TenHH: this.hangHoa.TenHH,
                    // Các trường thông tin sản phẩm khác
                    Gia: this.hangHoa.Gia,
                    DoiBong: this.hangHoa.DoiBong,
                    LoaiSanPham: this.hangHoa.LoaiSanPham,
                });

                for (const size of this.hangHoa.sizes) {
                    await HangHoaService.updateSize(this.hangHoa.MSHH, size.Size, {
                        SoLuongSize: size.SoLuongSize,
                    });
                }

                await Swal.fire('Cập nhật thành công!', '', 'success').then(() => {
                    this.router.push('/admin/kho-hang');
                });
            } catch (error) {
                console.error('Lỗi khi cập nhật hàng hóa:', error);
                Swal.fire('Đã xảy ra lỗi!', 'Vui lòng thử lại sau.', 'error');
            }
        },
        handleFileChange(event) {
            const selectedFiles = event.target.files;
            if (selectedFiles) {
                for (const file of selectedFiles) {
                    console.log(file);
                    this.selectedFile = file;
                    this.showFileInput = false;
                    const timestamp = new Date(file.lastModified).getTime();

                    // Tạo tên file mới bằng cách kết hợp "uploads-" với timestamp và đuôi mở rộng của file
                    const newFileName = `uploads\\uploads-${timestamp}.${file.name.split('.').pop()}`;

                    // Tạo đối tượng mới để đại diện cho mỗi file, bao gồm trường TenHinh và file chính thức
                    const imageObject = { TenHinh: newFileName };
                    this.selectedFile = file;

                    // Thêm đối tượng này vào mảng newHangHoa.images
                    this.newHangHoa.images.push(file);
                }
            }
        },

        removeImage(index) {
            this.newHangHoa.images.splice(index, 1);
        },
        updateLoaiSanPham(value) {
            this.hangHoa.LoaiSanPham = value;
        },

        async themMoiHangHoa() {
            try {
                // Thêm mới hàng hóa
                const { newHangHoa } = await HangHoaService.addHH({
                    TenHH: this.newHangHoa.TenHH,
                    Gia: this.newHangHoa.Gia,
                    DoiBong: this.newHangHoa.DoiBong,
                    LoaiSanPham: this.newHangHoa.LoaiSanPham,
                    sizes: this.newHangHoa.sizes,
                });
                console.log('newHangHoa', newHangHoa);
                // Thêm hình ảnh
                const formData = new FormData();
                if (!this.selectedFile) {
                    return;
                }
                formData.append('image', this.selectedFile);
                try {
                    await HangHoaService.addImage(newHangHoa.MSHH, formData);
                } catch (error) {
                    console.log('lỗi thêm hình ảnh', error);
                }

                await Swal.fire('Thêm mới thành công!', '', 'success').then(() => {
                    this.router.push('/admin/kho-hang');
                });
            } catch (error) {
                console.error('Lỗi khi thêm mới hàng hóa:', error);
                Swal.fire('Đã xảy ra lỗi!', 'Vui lòng thử lại sau.', 'error');
            }
        },
    },
    watch: {
        hangHoa(newValue, oldValue) {
            console.log('Giá trị của hangHoa:', newValue);
        },
    },
};
</script>
