const express = require('express');
const router = express.Router();
const NhanVienController = require('../controllers/NhanVien.controller');

router.post('/dang-ky', NhanVienController.NhanVienDKy);
router.post('/dang-nhap', NhanVienController.NhanVienDNhap);
router.post('/dang-xuat', NhanVienController.NhanVienDXuat);

module.exports = router;
