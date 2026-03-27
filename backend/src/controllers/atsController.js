const { analyzeResumeScore } = require('../services/aiService');

const analyzeATS = async (req, res) => {
    try {
        const { resumeData, jobDescription } = req.body;
        
        if (!resumeData) {
            return res.status(400).json({
                success: false,
                error: 'Resume data is required'
            });
        }

        const atsResult = await analyzeResumeScore(resumeData, jobDescription);

        return res.status(200).json({
            success: true,
            data: atsResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'ATS analysis failed'
        });
    }
};

module.exports = { analyzeATS };
