import createApiClient from './api.service';
class KhachHangService {
    constructor(baseUrl = '/api/nhan-vien') {
        this.api = createApiClient(baseUrl);
    }
    async NhanVienDNhap(data) {
        return (await this.api.post('/dang-nhap', data)).data;
    }
    async NhanVienDKy(data) {
        return (await this.api.post('/dang-ky', data)).data;
    }

    async NhanVienDXuat(data) {
        return (await this.api.post('/dang-xuat', data)).data;
    }

    async KhachHangCapNhat(MSKH, data) {
        return (await this.api.put(`/cap-nhat/${MSKH}`, data)).data;
    }
}
export default new KhachHangService();
