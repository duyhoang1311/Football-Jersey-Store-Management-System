<template>
    <div class="modal fade" id="hangHoaModal" role="dialog" aria-labelledby="hangHoaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center">
                    <h3 class="modal-title" id="hangHoaModalLabel">Thông Tin Chi Tiết</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4 col-sm-4">
                            <img
                                v-if="hangHoa && hangHoa.images"
                                :src="getImageUrl(hangHoa)"
                                alt="hình hàng hóa"
                                class="img-fluid"
                            />
                        </div>
                        <div class="col-8 col-sm-8">
                            <div v-if="hangHoa">
                                <h4 class="text-uppercase">{{ hangHoa.TenHH }}</h4>
                                <h5 class="mt-3 text-danger font-weight-bold">{{ formatGia(hangHoa.Gia) }}</h5>
                                <p class="mb-1 mt-3 font-weight-lighter">Kích thước</p>
                                <div class="custom-radio-group">
                                    <input
                                        type="radio"
                                        id="size_S"
                                        name="size"
                                        value="S"
                                        v-model="selectedSize"
                                        class="visually-hidden"
                                    />
                                    <label for="size_S" @click="handleSelectSize('S')">S</label>

                                    <input
                                        type="radio"
                                        id="size_M"
                                        name="size"
                                        value="M"
                                        v-model="selectedSize"
                                        class="visually-hidden"
                                    />
                                    <label for="size_M" @click="handleSelectSize('M')">M</label>

                                    <input
                                        type="radio"
                                        id="size_L"
                                        name="size"
                                        value="L"
                                        v-model="selectedSize"
                                        class="visually-hidden"
                                    />
                                    <label for="size_L" @click="handleSelectSize('L')">L</label>

                                    <input
                                        type="radio"
                                        id="size_XL"
                                        name="size"
                                        value="XL"
                                        v-model="selectedSize"
                                        class="visually-hidden"
                                    />
                                    <label for="size_XL" @click="handleSelectSize('XL')">XL</label>
                                </div>
                                <div class="my-3">
                                    <span class="font-weight-lighter">Số lượng</span>
                                    <button class="ml-3 decre-quantity-button" @click="decrementQuantity">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                    <input class="quantity-input" v-model="quantity" />
                                    <button class="incre-quantity-button" @click="incrementQuantity">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                    <span class="ml-3" v-if="selectedSize && hangHoa.sizes">
                                        {{ hangHoa.sizes.find((size) => size.Size === selectedSize).SoLuongSize }} sản
                                        phẩm có sẵn</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-add" :disabled="isButtonDisabled" @click="addProduct">
                        Thêm
                    </button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { useCartStore } from '../stores/cart';

export default {
    props: {
        hangHoa: Object,
    },
    data() {
        return {
            selectedSize: null,
            quantity: 1,
        };
    },
    methods: {
        getImageUrl(hangHoa) {
            return hangHoa.images && hangHoa.images.length > 0
                ? `http://localhost:3000/api/hang-hoa/image/${hangHoa.images[0].TenHinh.split('\\')[1]}`
                : '';
        },
        formatGia(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        handleSelectSize(value) {
            this.selectedSize = value;
            console.log('this.selectedSize', this.selectedSize);
        },
        incrementQuantity() {
            this.quantity++;
            console.log('this.quantity', this.quantity);
        },
        decrementQuantity() {
            this.quantity--;
            console.log('this.quantity', this.quantity);
        },
        addProduct() {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });

            if (this.selectedSize === null) {
                Toast.fire({
                    title: 'Lỗi!',
                    text: 'Vui lòng chọn kích thước',
                    icon: 'error',
                });
                return;
            }

            try {
                const data = {
                    hangHoa: this.hangHoa,
                    selectedSize: this.selectedSize,
                    quantity: this.quantity,
                };
                const cart = useCartStore();
                cart.addToCart(data);
                console.log('data addToCart', data);

                Toast.fire({
                    title: 'Good job!',
                    text: 'Đã thêm vào giỏ hàng',
                    icon: 'success',
                });
            } catch (error) {
                Toast.fire({
                    title: 'Lỗi!',
                    text: 'Không thêm được vào giỏ hàng',
                    icon: 'error',
                });
                console.log(error);
            }
        },
    },
    computed: {
        isButtonDisabled() {
            return (
                this.selectedSize &&
                this.hangHoa.sizes &&
                this.hangHoa.sizes.find((size) => size.Size === this.selectedSize).SoLuongSize === 0
            );
        },
    },
};
</script>

<style scoped>
.custom-radio-group {
    width: fit-content;
    border: 1px solid #666;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
}

.custom-radio-group input {
    display: none;
}

.custom-radio-group label {
    font-family: sans-serif;
    padding: 10px 16px;
    border-right: 1px solid #ccc;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0;
}

.custom-radio-group label:last-of-type {
    border-right: 0;
}

.custom-radio-group label:hover {
    background: #eee;
}

.custom-radio-group input:checked + label {
    background: #f37274;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: solid 1px;
}

.incre-quantity-button {
    border: solid 1px;
    border-left: 0px;
    padding: 0 6px 0 6px;
}

.decre-quantity-button {
    border: solid 1px;
    border-right: 0px;
    padding: 0 6px 0 6px;
}

.btn-add {
    background-color: #dc0021;
    color: #fff;
    transition: box-shadow 0.3s ease-in-out;
}

.btn-add:hover {
    color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
</style>
