const mongoose = require('mongoose');
const Resume = require('./src/models/Resume');
require('dotenv').config();

const connectDB = require('./src/config/db');

const test = async () => {
    await connectDB();
    try {
        const resume = new Resume({
            user: new mongoose.Types.ObjectId(),
            title: "Test Resume",
            experience: [{
                jobTitle: "Developer",
                employer: "Google",
                city: "",
                state: "",
                current: false,
                description: "Test description"
            }]
        });

        await resume.validate();
        console.log("Validation passed on full schema!");
    } catch (e) {
        console.log("Validation failed on full schema!");
        console.log("Error Name:", e.name);
        console.log("Error Message:", e.message);
    }
    process.exit(0);
}
test();
