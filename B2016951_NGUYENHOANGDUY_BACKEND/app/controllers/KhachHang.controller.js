const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const KhachHangModel = require('../models/KhachHang.model');
const ApiError = require('../api-error');
const { blacklist, getBlacklist, setBlacklist } = require('../../middleware/middleware');

class KhachHangController {
    async KhachHangDKy(req, res, next) {
        const { HoTenKH, Password, DiaChi, SoDienThoai, Email } = req.body;

        if (!HoTenKH || !Password || !DiaChi || !SoDienThoai || !Email) {
            return res.json({ success: false, message: 'Thông tin chưa đầy đủ' });
        }
        try {
            const latestKhachHang = await KhachHangModel.findOne().sort({ MSKH: -1 }); // Tìm người có MSNV lớn nhất
            let newMSKH;
            if (latestKhachHang) {
                newMSKH = latestKhachHang.MSKH + 1;
            } else {
                newMSKH = 1;
            }

            const hashedPassword = await bcrypt.hash(Password, 10);
            const newKhachHang = new KhachHangModel({
                MSKH: newMSKH,
                HoTenKH,
                Password: hashedPassword,
                DiaChi,
                SoDienThoai,
                Email,
            });
            const resultKhachHang = await newKhachHang.save();
            res.json({ success: true, message: 'Khách hàng đăng ký thành công', resultKhachHang });
        } catch (error) {
            console.log(error);
            return next(new ApiError(500, 'Đăng ký thất bại'));
        }
    }

    async KhachHangDNhap(req, res, next) {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return next(new ApiError(400, 'Thiếu tài khoản hay mật khẩu'));
        }
        try {
            const checkKhachHang = await KhachHangModel.findOne({ Email });
            if (!checkKhachHang) {
                return next(new ApiError(400, 'Người dùng không tồn tại'));
            }
            const validPassword = await bcrypt.compare(Password, checkKhachHang.Password);
            if (!validPassword) {
                return next(new ApiError(400, 'Mật khẩu chưa đúng'));
            }
            if (checkKhachHang && validPassword) {
                const accessToken = jwt.sign(
                    {
                        userId: checkKhachHang.MSKH,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                );
                console.log('req.userId', req.userId);
                return res
                    .status(200)
                    .json({ success: true, message: 'Đăng nhập thành công', checkKhachHang, accessToken });
            }
        } catch (error) {
            console.log('error', error);
            return next(new ApiError(500, 'Đăng nhập thất bại'));
        }
    }
    async KhachHangDXuat(req, res) {
        try {
            const token = req.headers.token.split(' ')[1];
            console.log('token', token);
            // res.clearCookie('token');
            // blacklist = getBlacklist();
            setBlacklist(token);
            return res.status(200).json({ success: true, message: 'Đăng xuất thành công' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Đăng xuất thất bại', error });
        }
    }
    async KhachHangCapNhat(req, res, next) {
        try {
            const KhachHangId = req.params.MSKH;
            const KHCapNhatData = req.body;
            console.log('KhachHangId', typeof KhachHangId);
            console.log('req.userId', typeof req.userId);
            if (req.userId != KhachHangId) {
                return next(new ApiError(400, 'Không có quyền thay đổi thông tin người khác'));
            }
            const updatedKhach = await KhachHangModel.updateOne({ MSKH: KhachHangId }, KHCapNhatData, { new: true });
            if (!updatedKhach) {
                return next(new ApiError(400, 'Không tìm thấy khách hàng để cập nhật'));
            }
            res.json({ success: true, message: 'Cập nhật thông tin khách hàng thành công', updatedKhach });
        } catch (error) {
            console.log('error', error);
            res.json({ success: false, message: 'Cập nhật thông tin khách hàng thất bại', error });
        }
    }
    async getAllKhach(req, res) {
        try {
            const listKhachHang = await KhachHangModel.find();
            res.json({ success: true, message: 'Lấy danh sách khách hàng thành công', listKhachHang });
        } catch (error) {
            res.json({ success: false, message: 'Lấy danh sách khách hàng thất bại', error });
        }
    }
}

module.exports = new KhachHangController();
