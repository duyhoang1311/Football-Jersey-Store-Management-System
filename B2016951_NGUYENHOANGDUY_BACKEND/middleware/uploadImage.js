// uploadMiddleware.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/', // Thư mục lưu trữ hình ảnh
  filename: function (req, file, cb) {
    cb(null, 'uploads-' + Date.now() + path.extname(file.originalname));
},
});

const uploadImg = multer({ storage: storage });

module.exports = uploadImg;
