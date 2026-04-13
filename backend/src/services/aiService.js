const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const enhanceText = async (systemPrompt, userInput) => {
    try {
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is missing');
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: systemPrompt // ✅ THIS IS THE FIX
        });

        const result = await model.generateContent(userInput);

        let responseText = result.response.text();

        if (!responseText) {
            throw new Error('No response from Gemini');
        }

        // ✅ HARD CLEAN (extra safety)
        responseText = responseText
            .replace(/^(Sure|Here is|Here's|Certainly).*?:?/i, '')
            .replace(/^\s*[-*]\s*/gm, '') // remove unwanted markdown bullets if needed
            .trim();

        return responseText;

    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
};

const analyzeResumeScore = async (resumeData, jobDescription) => {
    try {
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is missing');
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const prompt = `You are an expert ATS (Applicant Tracking System) analyzer. Today's date is ${currentDate}. Analyze the following resume data.
${jobDescription ? `Compare it against this Job Description: ${jobDescription}` : 'Provide a general ATS analysis based on standard industry practices.'}

Resume Data: ${JSON.stringify(resumeData)}

Respond STRICTLY in JSON format with the following structure:
{
    "scores": {
        "formatting": Number,
        "keywords": Number,
        "readability": Number,
        "overall": Number
    },
    "missingKeywords": [String],
    "weakSections": [
        { "section": String, "reason": String, "suggestion": String }
    ],
    "actionableSuggestions": [String]
}`;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text();

        let JSONText = responseText;
        const firstBrace = responseText.indexOf('{');
        const lastBrace = responseText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            JSONText = responseText.substring(firstBrace, lastBrace + 1);
        } else {
            JSONText = responseText.replace(/```json\n?|\n?```/g, '').trim();
        }

        return JSON.parse(JSONText);

    } catch (error) {
        console.error('Gemini ATS Error:', error);
        throw error;
    }
};

module.exports = { enhanceText, analyzeResumeScore };