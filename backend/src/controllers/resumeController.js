const Resume = require('../models/Resume');
const { validationResult } = require('express-validator');

// @desc    Get all resumes for logged in user
// @route   GET /api/resume
// @access  Private
const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, count: resumes.length, data: resumes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single resume
// @route   GET /api/resume/:id
// @access  Private
const getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        // Make sure user owns the resume
        if (resume.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to access this resume' });
        }

        res.status(200).json({ success: true, data: resume });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create new resume
// @route   POST /api/resume
// @access  Private
const createResume = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        // Add user to req.body
        req.body.user = req.user.id;

        const resume = await Resume.create(req.body);

        res.status(201).json({ success: true, data: resume });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update resume
// @route   PUT /api/resume/:id
// @access  Private
const updateResume = async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        // Make sure user owns the resume
        if (resume.user.toString() !== req.user.id) {
            console.error("AUTH FAILURE: Resume Ownership mismatch for ID:", req.params.id);
            console.error("Resume Owner:", resume.user.toString(), "| Requesting User:", req.user.id);
            return res.status(401).json({ success: false, error: 'Not authorized to update this resume' });
        }

        resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: resume });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        // Make sure user owns the resume
        if (resume.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to delete this resume' });
        }

        await resume.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    getResumes,
    getResume,
    createResume,
    updateResume,
    deleteResume
};
