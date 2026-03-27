const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('Connected. Deleting test@example.com user if exists.');
        const result = await User.deleteMany({ email: 'test@example.com' });
        console.log('Deleted counts:', result.deletedCount);
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILED:', err.message);
        process.exit(1);
    });
