const mongoose = require('mongoose');

require('dotenv').config(options = {
    path: '../.env'
});

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.yhfixct.mongodb.net/OVS`;

const connectWithRetry = () => {
    console.log("Connecting to the MongoDB Database...")
    mongoose.connect(CONNECTION_STRING).then(() => {
        console.log('MongoDB is connected')
    }).catch( err => {
        console.log(err);
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry();

exports.mongoose = mongoose;