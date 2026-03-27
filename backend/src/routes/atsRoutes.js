const express = require('express');
const { analyzeATS } = require('../controllers/atsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/analyze', analyzeATS);

module.exports = router;
