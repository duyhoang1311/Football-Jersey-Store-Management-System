const dbName = 'HDtech';

const config = {
    app: {
        port: process.env.PORT || 4000,
    },
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/HDTech',
    },
};

module.exports = config;
