const express = require('express');
const router = express.Router();
const KhachHangController = require('../controllers/KhachHang.controller');
const Middleware = require('../../middleware/middleware');
const {
    KhachHangDNhap,
    KhachHangDKy,
    KhachHangDXuat,
    KhachHangCapNhat,
    getAllKhach,
} = require('../controllers/KhachHang.controller');

router.route('/dang-nhap').post(KhachHangDNhap);
router.route('/dang-ky').post(KhachHangDKy);
router.route('/dang-xuat').post(Middleware.verifyToken, KhachHangDXuat);
router.route('/cap-nhat/:MSKH').put(Middleware.verifyToken, KhachHangCapNhat);
router.route('/get-all-khach').get(getAllKhach);

module.exports = router;
