const express = require('express');
const { check } = require('express-validator');
const {
    getResumes,
    getResume,
    createResume,
    updateResume,
    deleteResume
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All resume routes require authentication
router.use(protect);

router.route('/')
    .get(getResumes)
    .post(
        [
            check('title', 'Please provide a title for this resume').not().isEmpty()
        ],
        createResume
    );

router.route('/:id')
    .get(getResume)
    .put(updateResume)
    .delete(deleteResume);

module.exports = router;
