const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KhachHangSchema = new Schema({
    MSKH: {
        type: Number,
        require: true,
        unique: true,
    },
    HoTenKH: {
        type: String,
        require: true,
    },
    Password: {
        type: String,
        require: true,
    },
    DiaChi: {
        type: String,
        require: true,
    },
    SoDienThoai: {
        type: String,
        require: true,
    },
    Email: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('KhachHang', KhachHangSchema);
