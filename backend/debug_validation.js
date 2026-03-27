const mongoose = require('mongoose');
const Resume = require('./src/models/Resume');

const test = async () => {
    try {
        const resume = new Resume({
            user: new mongoose.Types.ObjectId(),
            title: "Test",
            experience: [{
                jobTitle: "Developer",
                employer: "Google",
                startDate: "", // Empty string
                endDate: ""
            }]
        });

        await resume.validate();
        console.log("Validation passed!");
    } catch (e) {
        console.log("Validation failed!");
        console.log("Error Name:", e.name);
        console.log("Error Message:", e.message);
    }
}
test();
