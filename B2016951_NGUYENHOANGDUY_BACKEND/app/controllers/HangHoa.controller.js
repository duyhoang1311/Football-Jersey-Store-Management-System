const ApiError = require('../api-error');
const HangHoaModel = require('../models/HangHoa.model');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

class HangHoaController {
    async getHinhHH(req, res) {
        try {
            let { fileName } = req.params;
            console.log(fileName);
            const pathName = path.resolve(__dirname, '../../uploads/' + fileName);
            console.log(pathName);
            // Đọc file bằng readFileAsync (đã được promisify)
            const file = await readFileAsync(pathName);
            return res.header('Content-Type', 'image/png').status(200).send(file);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }
    async addHH(req, res) {
        const { TenHH, MoTaHH, Gia, LoaiSanPham, DoiBong, sizes } = req.body;
        if (!TenHH || !Gia || !LoaiSanPham || !DoiBong || !sizes) {
            return new (ApiError(400, 'Chưa đủ thông tin thêm sản phẩm mới'))();
        }
        try {
            //* Auto Increment
            const latestHangHoa = await HangHoaModel.findOne().sort({ MSHH: -1 }); // Tìm MSHH lớn nhất
            let newMSHH;
            if (latestHangHoa) {
                newMSHH = latestHangHoa.MSHH + 1;
            } else {
                newMSHH = 1;
            }

            const newHangHoa = new HangHoaModel({
                MSHH: newMSHH,
                TenHH,
                Gia,
                LoaiSanPham,
                DoiBong,
                sizes,
            });

            // Lưu đối tượng mặt hàng vào cơ sở dữ liệu
            await newHangHoa.save();

            res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', newHangHoa });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Thêm sản phẩm thất bại', error });
        }
    }
    async updateHH(req, res) {
        try {
            const HangHoaId = Number(req.params.MSHH);
            const HangHoaUpdateData = req.body;
            console.log('HangHoaId', HangHoaId);
            console.log('HangHoaUpdateData', HangHoaUpdateData);

            const checkHangHoa = await HangHoaModel.findOne({ MSHH: HangHoaId });
            console.log('checkHangHoa', checkHangHoa);
            if (!checkHangHoa) {
                return res.status(500).json({ success: false, message: `Không tìm thấy sản phẩm với mã ${HangHoaId}` });
            }
            const updatedHangHoa = await HangHoaModel.findByIdAndUpdate(checkHangHoa._id, HangHoaUpdateData, {
                new: true,
            });
            res.status(201).json({ success: true, message: 'Cập nhật sản phẩm thành công', updatedHangHoa });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Cập nhật sản phẩm thất bại', error });
        }
    }

    async getAllHangHoa(req, res) {
        try {
            const listHangHoa = await HangHoaModel.find();
            if (!listHangHoa) {
                res.status(500).json({ success: false, message: 'Chưa có hàng hóa' });
            }
            res.status(200).json({ success: true, message: 'Lấy danh sách hàng hóa thành công', listHangHoa });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy danh sách hàng hóa thất bại', error });
        }
    }

    async updateSize(req, res) {
        try {
            const HangHoaId = Number(req.params.MSHH);
            console.log('HangHoaId', HangHoaId);
            const sizeInParams = req.params.size;
            console.log('sizeInParams', sizeInParams);
            const { SoLuongSize } = req.body;

            const checkHangHoa = await HangHoaModel.findOne({ MSHH: HangHoaId });
            console.log('checkHangHoa', checkHangHoa);

            if (!checkHangHoa) {
                return res.status(404).json({ success: false, message: `Không tìm thấy sản phẩm với mã ${HangHoaId}` });
            }

            // Tìm và cập nhật thông tin của Size cụ thể trong mảng sizes
            const sizeToUpdate = checkHangHoa.sizes.find((size) => size.Size === sizeInParams);
            console.log('sizeToUpdate', sizeToUpdate);
            if (sizeToUpdate) {
                sizeToUpdate.SoLuongSize = SoLuongSize;
            }

            // Lưu các thay đổi vào cơ sở dữ liệu
            await checkHangHoa.save();

            res.status(200).json({ success: true, message: 'Cập nhật thông tin size thành công', checkHangHoa });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Cập nhật thông tin size thất bại', error });
        }
    }
    async deleteHH(req, res) {
        try {
            const HangHoaId = Number(req.params.MSHH);
            const findHH = await HangHoaModel.findOne({ MSHH: HangHoaId });
            console.log('findHH', findHH);

            if (!findHH) {
                res.status(404).json({ success: false, message: `Không tìm thấy hàng hóa có mã ${HangHoaId}` });
            }
            const deletedHH = await HangHoaModel.findByIdAndDelete(findHH._id);
            res.status(200).json({ success: true, message: 'Xóa hàng hóa thành công', deletedHH });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Xóa hàng hóa thất bại', error });
        }
    }
    async addImage(req, res) {
        try {
            const HangHoaId = Number(req.params.MSHH);
            const imagePath = req.file.path;

            const hangHoa = await HangHoaModel.findOne({ MSHH: HangHoaId });
            hangHoa.images.push({ TenHinh: imagePath });
            await hangHoa.save();

            res.status(201).json({ message: 'Upload success' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'thất bại', error });
        }
    }
    async getHangHoaByMSHH(req, res) {
        try {
            const HangHoaMSHH = req.params.MSHH;
            const checkedHangHoa = await HangHoaModel.findOne({ MSHH: HangHoaMSHH });

            if (!checkedHangHoa) {
                res.status(404).json({
                    success: false,
                    message: `Không tìm thấy hàng hóa có mã ${HangHoaMSHH}`,
                    error,
                });
            }
            res.status(200).json({ success: true, message: 'Lấy hàng hóa thành công', checkedHangHoa });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy hàng hóa thất bại', error });
        }
    }
}

module.exports = new HangHoaController();
