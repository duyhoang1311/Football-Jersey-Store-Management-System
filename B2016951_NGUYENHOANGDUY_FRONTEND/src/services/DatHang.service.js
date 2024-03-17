import createApiClient from './api.service';
class DatHangService {
    constructor(baseUrl = '/api/dat-hang') {
        this.api = createApiClient(baseUrl);
    }
    async taoDonDatHang(data) {
        return (await this.api.post('/them-don-hang', data)).data;
    }
    async duyetDonDatHang(data) {
        return (await this.api.post('/duyet-don-hang', data)).data;
    }
    async getDonHangByMSKH(MSKH) {
        return (await this.api.get(`/lay-don-hang/${MSKH}`)).data;
    }
    async getAllDonHang() {
        return (await this.api.get('/lay-don-hang')).data;
    }
    async getThongKe() {
        return (await this.api.get('/thong-ke')).data;
    }
}
export default new DatHangService();
