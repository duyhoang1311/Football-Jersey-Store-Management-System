// Trong HangHoa.controller.js

const ApiError = require('../api-error');
const HangHoaModel = require('../models/HangHoa.model');
const HinhHHModel = require('../models/HinhHH.model');

class HinhHHController {

    async addImage(req, res) {
        try {
            const latestHinhAnh = await HinhHHModel.findOne().sort({ MaHinh: -1 }); // Tìm người có MSNV lớn nhất
            let newMaHinh;
            if (latestHinhAnh) {
                newMaHinh = latestHinhAnh.MaHinh + 1;
            } else {
                newMaHinh = 1;
            }

            const HangHoaId = Number(req.params.MSHH);
            const imagePath = req.file.path;

            // Tạo một hình mới trong database
            const newImage = new HinhHHModel({
                MaHinh: newMaHinh,
                TenHinh: req.file.path,
                MSHH: HangHoaId, // MSHH của hàng hóa tương ứng
            });
            console.log('newImage', newImage);

            await newImage.save();

            // Cập nhật mảng images trong HangHoa
            const hangHoa = await HangHoaModel.findOne({ MSHH: HangHoaId });
            hangHoa.images.push({ TenHinh: newImage.TenHinh });
            await hangHoa.save();

            res.status(201).json({ message: 'Upload success' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'thất bại', error });
        }
    }
    async getHinhHH(req, res){
        try {
            const listHinhHH = HinhHHModel.find();

        } catch (error) {
            
        }
    }
}

module.exports = new HinhHHController();
