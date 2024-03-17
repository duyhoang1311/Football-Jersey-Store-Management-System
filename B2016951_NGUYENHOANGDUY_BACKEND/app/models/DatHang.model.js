const mongoose = require('mongoose');
const NhanVienSchema = require('./NhanVien.model');
const ChiTietDatHangSchema = require('./ChiTietDatHang.model'); // Import schema

const Schema = mongoose.Schema;

const DatHangSchema = new Schema({
    SoDonDH: {
        type: Number,
        required: true,
        unique: true,
    },
    MSNV: {
        type: Number,
        ref: 'NhanVien',
    },
    MSKH: {
        type: Number,
        required: true,
    },
    NgayDH: {
        type: Date,
        default: Date.now(),
    },
    NgayGH: {
        type: Date,
    },
    TrangThaiDH: {
        type: String,
        enum: ['Chưa xử lý', 'Đang xử lý', 'Đã xử lý', 'Đã giao hàng', 'Đã hủy'],
        default: 'Chưa xử lý',
    },
    TongChiPhi: {
        type: Number,
    },
    Duyet: {
        type: Boolean,
        default: false,
    },
    ChiTiet: [ChiTietDatHangSchema], // Sử dụng schema con ở đây
});

module.exports = mongoose.model('DatHang', DatHangSchema);
