const express = require('express');
const { generateEnhancement } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/enhance', generateEnhancement);

module.exports = router;
