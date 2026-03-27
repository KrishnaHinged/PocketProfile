require('dotenv').config();
const fs = require('fs');

try {
    const { GoogleGenAI } = require('@google/genai');
    fs.writeFileSync('output.txt', 'Requires successfully loaded.\\n');

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    fs.appendFileSync('output.txt', 'Initialized ai.\\n');

    const enhanceText = async (promptText) => {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: promptText,
            });
            fs.appendFileSync('output.txt', 'Response received: ' + response.text + '\\n');
            return response.text;
        } catch (error) {
            fs.appendFileSync('output.txt', 'Error generating: ' + error.message + '\\n');
            throw error;
        }
    };

    enhanceText("Hello world.").then(res => {
        fs.appendFileSync('output.txt', 'Final output: ' + res + '\\n');
    }).catch(e => {
        fs.appendFileSync('output.txt', 'Final Error: ' + e.message + '\\n');
    });

} catch (err) {
    fs.writeFileSync('output.txt', 'Fatal error: ' + err.message + '\\n' + err.stack);
}
