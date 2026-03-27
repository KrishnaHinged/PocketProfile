const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');

console.log('Fetching users...');
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('Connected.');
        const users = await User.find({});
        console.log('Users in DB:', users.map(u => u.email));
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILED:', err.message);
        process.exit(1);
    });
