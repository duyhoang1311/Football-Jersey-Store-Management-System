const express = require('express');
const router = express.Router();
const HinhHHController = require('../controllers/HinhHH.controller');
const uploadImage = require('../../middleware/uploadImage')

router.post('/them-hinh-anh/:MSHH', uploadImage.single('image'), HinhHHController.addImage);

module.exports = router;
