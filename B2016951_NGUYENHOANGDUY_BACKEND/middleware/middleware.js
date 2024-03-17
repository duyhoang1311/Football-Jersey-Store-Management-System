const jwt = require('jsonwebtoken');
const blacklist = [];

const Middleware = {
    // verifyToken, xac thuc nguoi dung
    verifyToken(req, res, next) {
        const token = req.headers.token;
        // Neu nguoi dung co token
        if (blacklist.includes(token.split(' ')[1])) {
            return res.status(401).json({ success: false, message: 'Token đã bị hủy' });
        }
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) return res.json({ success: false, message: 'Token không hợp lệ' });
                req.userId = decoded.userId;
                next();
            });
        } else {
            return res.json({ success: false, message: 'Bạn chưa được xác thực' });
        }
    },
    getBlacklist() {
        return blacklist;
    },
    setBlacklist(token) {
        blacklist.push(token);
    },
};

module.exports = Middleware;
