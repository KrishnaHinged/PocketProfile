const mongoose = require('mongoose');
require('dotenv').config();

console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('SUCCESS: Connected to DB.');
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILED to connect to DB:', err.message);
        process.exit(1);
    });
