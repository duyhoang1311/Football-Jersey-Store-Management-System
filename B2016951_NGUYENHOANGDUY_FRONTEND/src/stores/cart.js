import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        gioHang: [],
    }),
    getters: {
        getGioHang() {
            return this.$state.gioHang || [];
        },
    },

    actions: {
        addToCart(data) {
            const existingItemIndex = this.$state.gioHang.findIndex(
                (item) => item.hangHoa.MSHH === data.hangHoa.MSHH && item.selectedSize === data.selectedSize,
            );

            if (existingItemIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng và cộng giá
                this.$state.gioHang[existingItemIndex].quantity += data.quantity;
                this.$state.gioHang[existingItemIndex].totalPrice += data.hangHoa.Gia * data.quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                const newItem = {
                    hangHoa: data.hangHoa,
                    selectedSize: data.selectedSize,
                    quantity: data.quantity,
                    totalPrice: data.hangHoa.Gia * data.quantity,
                };
                this.$state.gioHang.push(newItem);
            }

            // Lưu giỏ hàng vào localStorage
            this.saveToLocalStorage();
        },
        removeFromCart(index) {
            this.removeCartItem(index);
            this.saveToLocalStorage();
        },
        removeCartItem(index) {
            // Xóa sản phẩm khỏi giỏ hàng dựa vào index
            this.$state.gioHang.splice(index, 1);

            this.saveToLocalStorage();
        },
        removeAll() {
            this.$state.gioHang = [];

            localStorage.removeItem('gioHang');
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            localStorage.setItem('gioHang', JSON.stringify(this.$state.gioHang));
        },
    },
});
