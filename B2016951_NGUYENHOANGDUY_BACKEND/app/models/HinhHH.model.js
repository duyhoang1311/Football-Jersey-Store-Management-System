const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HinhHHSchema = new Schema({
    MaHinh: {
        type: Number,
        require: true,
        unique: true,
    },
    TenHinh: {
        type: String,
        require: true,
    },
    MSHH: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('HinhHH', HinhHHSchema);
