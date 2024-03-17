import createApiClient from './api.service';
class HangHoaService {
    constructor(baseUrl = '/api/hang-hoa') {
        this.api = createApiClient(baseUrl);
    }
    async getAllHangHoa() {
        return (await this.api.get('/get-all-hang-hoa')).data;
    }
    async addHH(data) {
        return (await this.api.post('/them-hang-hoa', data)).data;
    }

    async deleteHH(MSHH) {
        return (await this.api.delete(`/xoa-hang-hoa/${MSHH}`)).data;
    }

    async updateHH(MSHH, data) {
        return (await this.api.put(`/cap-nhat-hang-hoa/${MSHH}`, data)).data;
    }

    async updateSize(MSHH, size, data) {
        return (await this.api.put(`/cap-nhat-size-hang-hoa/${MSHH}/size/${size}`, data)).data;
    }
    async getHinhHH(fileName) {
        return (await this.api.get(`/image/${fileName}`)).data;
    }
    async layHangHoaByMSHH(MSHH) {
        return (await this.api.get(`/lay-hang-hoa/${MSHH}`)).data;
    }
    async addImage(MSHH, formData) {
        return (
            await this.api.post(`/them-hinh-anh/${MSHH}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        ).data;
    }
}
export default new HangHoaService();
