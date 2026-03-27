require('dotenv').config();
const { enhanceText } = require('./src/services/aiService');

const test = async () => {
    try {
        console.log("Testing aiService...");
        const res = await enhanceText("This is a test.");
        console.log(typeof res, res);
    } catch (e) {
        console.error(e);
    }
}
test();
