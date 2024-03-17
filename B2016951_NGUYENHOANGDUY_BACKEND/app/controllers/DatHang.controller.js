const DatHangModel = require('../models/DatHang.model');
const NhanVienModel = require('../models/NhanVien.model');
const KhachHangModel = require('../models/KhachHang.model');
const HangHoaModel = require('../models/HangHoa.model');
const ChiTietDatHangModel = require('../models/ChiTietDatHang.model');

class DatHangController {
    async taoDonDatHang(req, res) {
        const { MSKH, ChiTiet } = req.body;
        if (!MSKH || !ChiTiet) {
            return res.json({ success: false, message: 'Chưa đủ thông tin lập Đơn hàng' });
        }

        try {
            const latestDatHang = await DatHangModel.findOne().sort({ SoDonDH: -1 });
            let newSoDonDH;
            if (latestDatHang) {
                newSoDonDH = latestDatHang.SoDonDH + 1;
            } else {
                newSoDonDH = 1;
            }

            const getMSKH = await KhachHangModel.findOne({ MSKH });

            const newDatHang = new DatHangModel({
                SoDonDH: newSoDonDH,
                MSKH: getMSKH.MSKH,
                ChiTiet,
            });

            const savedDatHang = await newDatHang.save();

            res.status(201).json({ success: true, message: 'Tạo đơn đặt hàng thành công', savedDatHang });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Tạo đơn đặt hàng thất bại', error });
        }
    }
    async duyetDonDatHang(req, res) {
        const { MSNV, MSKH, SoDonDH, NgayGH } = req.body;

        try {
            console.log('req.body', req.body);
            const datHang = await DatHangModel.findOne({
                SoDonDH,
                MSKH,
                Duyet: false,
            });
            console.log('datHang', datHang);

            if (!datHang) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Không tìm thấy đơn đặt hàng hoặc đã được duyệt' });
            }

            for (const ct of datHang.ChiTiet) {
                const { MSHH, Size, SoLuong } = ct;
                const hangHoa = await HangHoaModel.findOne({ MSHH });

                if (hangHoa) {
                    ct.GiaHangDat = SoLuong * hangHoa.Gia;

                    const sizeInfo = hangHoa.sizes.find((size) => size.Size === Size);

                    if (sizeInfo && sizeInfo.SoLuongSize >= SoLuong) {
                        sizeInfo.SoLuongSize -= SoLuong;
                        await hangHoa.save();
                    } else {
                        // Xử lý nếu số lượng hàng không đủ để đáp ứng yêu cầu
                        return res.status(400).json({ success: false, message: 'Số lượng hàng không đủ' });
                    }
                } else {
                    // Xử lý nếu không tìm thấy thông tin hàng hóa
                    return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin hàng hóa' });
                }
            }

            datHang.Duyet = true;
            datHang.TongChiPhi = datHang.ChiTiet.reduce((total, ct) => total + ct.GiaHangDat, 0);
            datHang.NgayGH = NgayGH;
            datHang.TrangThaiDH = 'Đã xử lý';
            if (datHang.NgayDH > NgayGH) {
                return res.json({ success: false, message: 'Ngày giao hàng không được lớn hơn ngày đặt hàng' });
            }
            datHang.MSNV = MSNV;
            await datHang.save();

            res.status(200).json({ success: true, message: 'Duyệt đơn đặt hàng thành công', datHang });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Duyệt đơn đặt hàng thất bại', error });
        }
    }
    async getDonHangByMSKH(req, res) {
        try {
            const MSKhach = req.params.MSKH;
            const CheckedDonHang = await DatHangModel.find({ MSKH: MSKhach });

            if (!MSKhach) {
                res.status(404).json({ success: false, message: 'Không tìm được khách hàng' });
            }
            res.status(200).json({
                success: true,
                message: `Lấy thành công danh sách đơn hàng của khách hàng có mã số ${MSKhach}`,
                CheckedDonHang,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Laasy danh sách đơn hàng thất bại', error });
        }
    }

    async getAllDonDatHang(req, res) {
        try {
            const listDonDatHang = await DatHangModel.find();
            res.status(200).json({
                success: true,
                message: 'Lấy danh sách đơn hàng thành công',
                listDonDatHang,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Laasy danh sách đơn hàng thất bại', error });
        }
    }
    async getThongKe(req, res) {
        try {
            const checkedDonHangDone = await DatHangModel.find({Duyet: true})
            res.status(200).json({ success: true, message: 'Lấy đơn đặt hàng đã duyệt thành công', checkedDonHangDone });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Laasy danh sách đơn hàng thất bại', error });
        }
    }
}

module.exports = new DatHangController();
