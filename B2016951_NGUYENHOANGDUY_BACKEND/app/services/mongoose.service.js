const mongoose = require('mongoose')
// const AutoIncrementFactory = require('mongoose-sequence')(mongoose);
const config = require('../config');

class MongooseService {
    static async connectDB() {
        try {
            await mongoose.connect(config.db.uri);

            // const AutoIncrement = AutoIncrementFactory(connection);

            console.log('Connected to DB');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MongooseService;
