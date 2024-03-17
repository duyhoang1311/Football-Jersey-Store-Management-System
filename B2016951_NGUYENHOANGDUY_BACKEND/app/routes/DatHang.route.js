const express = require('express');
const router = express.Router();
const DatHangController = require('../controllers/DatHang.controller');
const Middleware = require('../../middleware/middleware');

router.post('/them-don-hang', DatHangController.taoDonDatHang);
router.post('/duyet-don-hang', DatHangController.duyetDonDatHang);
router.get('/lay-don-hang/:MSKH', DatHangController.getDonHangByMSKH);
router.get('/lay-don-hang', DatHangController.getAllDonDatHang);
router.get('/thong-ke', DatHangController.getThongKe);

module.exports = router;
