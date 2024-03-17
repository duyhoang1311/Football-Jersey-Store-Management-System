const express = require('express');
const session = require('express-session');
const cors = require('cors');
const routes = require('./app/routes/index');
// const uploadImg = require('./middleware/uploadImg')

const app = express();
require('dotenv').config();

app.use(
    session({
        secret: 'mySecretKey', // Chuỗi bí mật dùng để mã hóa session
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcom to contact book application.', session: req.session });
});

const MongooseService = require('./app/services/mongoose.service');
// const HangHoa = require('./app/models/HangHoa.model');
// const uploadImg = require('./middleware/uploadImage');
MongooseService.connectDB();

routes(app);

//* Upload image
// app.post('/upload', uploadImg.single('image'), async (req, res) => {
//     try {
//         const { MSHH } = req.body;
//         const imagePath = req.file.path;

//         // Tạo một hình mới trong database
//         const newImage = new HinhHH({
//             TenHinh: req.file.filename,
//             MSHH: MSHH, // MSHH của hàng hóa tương ứng
//         });

//         await newImage.save();

//         // Cập nhật mảng images trong HangHoa
//         const hangHoa = await HangHoa.findOne({ MSHH: MSHH });
//         hangHoa.images.push(imagePath);
//         await hangHoa.save();

//         res.status(201).json({ message: 'Upload success' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = app;
