const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NhanVienModel = require('../models/NhanVien.model');
const ApiError = require('../api-error');
const { setBlacklist } = require('../../middleware/middleware');

class NhanVienController {
    async NhanVienDKy(req, res, next) {
        const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai, Email } = req.body;

        if (!HoTenNV || !Password || !ChucVu || !DiaChi || !SoDienThoai || !Email) {
            return res.json({ success: false, message: 'Thông tin chưa đầy đủ' });
        }
        try {
            const latestNhanVien = await NhanVienModel.findOne().sort({ MSNV: -1 }); // Tìm người có MSNV lớn nhất
            let newMSNV;
            if (latestNhanVien) {
                newMSNV = latestNhanVien.MSNV + 1;
            } else {
                newMSNV = 1;
            }

            const hashedPassword = await bcrypt.hash(Password, 10);
            const newNhanVien = new NhanVienModel({
                MSNV: newMSNV,
                HoTenNV,
                Password: hashedPassword,
                ChucVu,
                DiaChi,
                SoDienThoai,
                Email,
            });
            const resultNhanVien = await newNhanVien.save();
            res.json({ success: true, message: 'Nhân viên đăng ký thành công', resultNhanVien });
        } catch (error) {
            console.log(error);
            return next(new ApiError(500, 'Đăng ký thất bại'));
        }
    }

    async NhanVienDNhap(req, res, next) {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return next(new ApiError(400, 'Thiếu tài khoản hay mật khẩu'));
        }
        try {
            const checkNhanVien = await NhanVienModel.findOne({ Email });
            if (!checkNhanVien) {
                return next(new ApiError(400, 'Người dùng không tồn tại'));
            }
            const validPassword = await bcrypt.compare(Password, checkNhanVien.Password);
            if (!validPassword) {
                return next(new ApiError(400, 'Mật khẩu chưa đúng'));
            }
            if (checkNhanVien && validPassword) {
                const accessToken = jwt.sign(
                    {
                        userId: checkNhanVien.MSNV,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                );
                return res.status(200).json({ success: true, message: 'Đăng nhập thành công', checkNhanVien, accessToken });
            }
        } catch (error) {
            console.log(error);
            return next(new ApiError(500, 'Đăng nhập thất bại'));
        }
    }
    async NhanVienDXuat(req, res) {
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
}

module.exports = new NhanVienController();
