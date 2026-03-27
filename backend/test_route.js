require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const testRoute = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        fs.appendFileSync('output_api.txt', 'DB Connected.\\n');

        let user = await User.findOne({});
        if (!user) {
            fs.appendFileSync('output_api.txt', 'No user found.\\n');
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        fs.appendFileSync('output_api.txt', 'Token generated.\\n');

        const response = await fetch('http://localhost:5000/api/ai/enhance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                text: 'I wrote code',
                type: 'experience'
            })
        });

        const data = await response.json();
        fs.appendFileSync('output_api.txt', 'API Result: ' + JSON.stringify(data) + '\\n');
    } catch (error) {
        fs.appendFileSync('output_api.txt', 'API Error: ' + error.message + '\\n');
    } finally {
        mongoose.disconnect();
    }
};

testRoute();
