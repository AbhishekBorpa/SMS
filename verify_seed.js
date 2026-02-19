const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Class = require('./src/models/Class');

dotenv.config();

const verifyData = async () => {
    try {
        await connectDB();
        const userCount = await User.countDocuments();
        const classCount = await Class.countDocuments();
        console.log(`Users: ${userCount}`);
        console.log(`Classes: ${classCount}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyData();
