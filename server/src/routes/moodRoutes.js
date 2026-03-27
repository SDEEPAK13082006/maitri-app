// Mood Routes
const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const { protect } = require('../middleware/auth');

// All mood routes require authentication
router.use(protect);

// Mood endpoints
router.post('/log', moodController.logMood);
router.get('/history', moodController.getMoodHistory);
router.get('/today', moodController.getTodaysMood);
router.put('/:moodId', moodController.updateMood);

module.exports = router;
