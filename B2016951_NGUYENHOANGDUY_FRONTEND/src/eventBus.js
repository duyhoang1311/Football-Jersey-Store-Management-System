// eventBus.js
import { createPinia } from 'pinia';
import { useCartStore } from './stores/cart';

const pinia = createPinia(); // Tạo đối tượng Pinia

// Sử dụng Pinia trong useCartStore
const cartStore = useCartStore(pinia);

// Hàm để thêm sản phẩm vào giỏ hàng
export const addToCart = (data) => {
    cartStore.addToCart(data);
};
