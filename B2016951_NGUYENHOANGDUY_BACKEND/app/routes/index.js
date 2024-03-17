const express = require('express');
const router = express.Router();

const NhanVienRouter = require('./NhanVien.route');
const KhachHangRouter = require('./KhachHang.route');
const HangHoaRouter = require('./HangHoa.route');
const DatHangRouter = require('./DatHang.route');
const HinhHHRouter = require('./HinhHH.route');

function routes(app) {
    app.use('/api/nhan-vien', NhanVienRouter);
    app.use('/api/khach-hang', KhachHangRouter);
    app.use('/api/hang-hoa', HangHoaRouter);
    app.use('/api/dat-hang', DatHangRouter);
    app.use('/api/hinh-hang-hoa', HinhHHRouter);
}

module.exports = routes;
