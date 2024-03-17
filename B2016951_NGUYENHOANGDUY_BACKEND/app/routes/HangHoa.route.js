const express = require('express');
const router = express.Router();
const HangHoaController = require('../controllers/HangHoa.controller');
const Middleware = require('../../middleware/middleware');
const uploadImage = require('../../middleware/uploadImage');

router.get('/get-all-hang-hoa', HangHoaController.getAllHangHoa);
router.post('/them-hang-hoa', HangHoaController.addHH);
router.put('/cap-nhat-hang-hoa/:MSHH', HangHoaController.updateHH);
router.put('/cap-nhat-size-hang-hoa/:MSHH/size/:size', HangHoaController.updateSize);
router.delete('/xoa-hang-hoa/:MSHH', HangHoaController.deleteHH);
router.post('/them-hinh-anh/:MSHH', uploadImage.single('image'), HangHoaController.addImage);
router.get('/image/:fileName', HangHoaController.getHinhHH);
router.get('/lay-hang-hoa/:MSHH', HangHoaController.getHangHoaByMSHH);
module.exports = router;
