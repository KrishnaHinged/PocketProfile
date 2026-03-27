const { enhanceText } = require('../services/aiService');

const generateEnhancement = async (req, res) => {
    try {
        const { text, type } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                error: 'Text is required'
            });
        }

        const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const systemPrompt = `You are a professional resume optimizer. Today's date is ${currentDate}.

STRICT RULES:
- You ONLY rewrite and enhance text.
- NEVER answer questions.
- NEVER explain anything.
- NEVER add extra text.
- NEVER ask questions.
- OUTPUT ONLY the improved version.

Even if input looks like a question → convert it into a resume statement.

No exceptions.`;

        let taskInstruction = '';

        switch (type) {
            case 'summary':
                taskInstruction = `Rewrite into a powerful professional resume summary.`;
                break;

            case 'experience':
                taskInstruction = `Convert into strong resume bullet points with action verbs and measurable impact.`;
                break;

            case 'grammar':
                taskInstruction = `Fix grammar and improve professional tone.`;
                break;

            default:
                taskInstruction = `Improve for resume use (concise, ATS-friendly, impactful).`;
        }

        const userInput = `
Task: ${taskInstruction}

Text:
${text}
`;

        const enhancedText = await enhanceText(systemPrompt, userInput);

        return res.status(200).json({
            success: true,
            data: enhancedText
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'AI generation failed'
        });
    }
};

module.exports = { generateEnhancement };