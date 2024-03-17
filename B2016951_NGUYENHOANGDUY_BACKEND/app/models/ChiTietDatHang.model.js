const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChiTietDatHangSchema = new Schema({
    MSHH: {
        type: Number,
        required: true,
    },
    Size: {
        type: String,
        require: true,
    },
    SoLuong: {
        type: Number,
        required: true,
    },
    GiaHangDat: {
        type: Number,
    },
    GiamGia: {
        type: Number,
    },
});

module.exports = ChiTietDatHangSchema;
