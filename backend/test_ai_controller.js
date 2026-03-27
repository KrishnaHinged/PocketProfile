require('dotenv').config();
const { generateEnhancement } = require('./src/controllers/aiController');

const testApi = async () => {
    // Mock express Req and Res
    const req = {
        body: {
            text: "Developed a backend application.",
            type: "experience"
        }
    };
    const res = {
        status: function (code) {
            console.log("Status:", code);
            return this;
        },
        json: function (data) {
            console.log("JSON Body:", data);
            return this;
        }
    };

    try {
        await generateEnhancement(req, res);
    } catch (e) {
        console.error(e);
    }
}

testApi();
