import { useAuthStore } from '../stores/store';
import createApiClient from './api.service';
class KhachHangService {
    constructor(baseUrl = '/api/khach-hang') {
        this.api = createApiClient(baseUrl);
    }
    async KhachHangDNhap(data) {
        return (await this.api.post('/dang-nhap', data)).data;
    }
    async KhachHangDKy(data) {
        return (await this.api.post('/dang-ky', data)).data;
    }

    async KhachHangDXuat() {
        const authStore = useAuthStore();

        const accessToken = authStore.accessToken;
        console.log('accessToken1', accessToken);
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        return (await this.api.post('/dang-xuat', null, { headers })).data;
    }

    async KhachHangCapNhat(MSKH, data) {
        return (await this.api.put(`/cap-nhat/${MSKH}`, data)).data;
    }
    async getAllKhach() {
        return (await this.api.get('get-all-khach')).data;
    }
}
export default new KhachHangService();
