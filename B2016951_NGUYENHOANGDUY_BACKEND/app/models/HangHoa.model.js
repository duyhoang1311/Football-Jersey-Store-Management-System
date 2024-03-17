const mongoose = require('mongoose');
const HinhHHSchema = require('./HinhHH.model');
const Schema = mongoose.Schema;

const KichThuocSchema = new Schema({
    Size: {
        type: String,
        required: true,
    },
    SoLuongSize: {
        type: Number,
        required: true,
        default: 0,
    },
});

const HangHoaSchema = new Schema({
    MSHH: {
        type: Number,
        unique: true,
    },
    TenHH: {
        type: String,
        require: true,
    },
    MoTaHH: {
        type: String,
    },
    Gia: {
        type: Number,
        require: true,
    },
    SoLuongHang: {
        type: Number,
    },
    GhiChu: {
        type: String,
    },
    LoaiSanPham: {
        type: String,
        enum: ['Áo thun', 'Áo khoác', 'Áo bóng đá'],
        required: true,
    },
    DoiBong: {
        type: String,
        enum: ['Manchester United', 'Real Madrid', 'Barcelona', 'Inter Miami', 'Arsenal'],
        required: true,
    },
    sizes: [KichThuocSchema],
    images: [{ TenHinh: String}],
});

// Tạo phương thức ảo để tính tổng số lượng hàng hóa trong từng kích thước
HangHoaSchema.virtual('totalQuantity').get(function () {
    let totalQuantity = 0;
    if (this.sizes && this.sizes.length > 0) {
        totalQuantity = this.sizes.reduce((total, size) => total + size.SoLuongSize, 0);
    }
    return totalQuantity;
});

// Tạo middleware để tự động cập nhật trường SoLuongHang khi lưu
HangHoaSchema.pre('save', function (next) {
    this.SoLuongHang = this.totalQuantity;
    next();
});

const HangHoa = mongoose.model('HangHoa', HangHoaSchema);

module.exports = HangHoa;
