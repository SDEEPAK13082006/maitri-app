// Health Routes
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const { protect } = require('../middleware/auth');

// All health routes require authentication
router.use(protect);

// Health endpoints
router.post('/log', healthController.logHealthData);
router.get('/data', healthController.getHealthData);
router.get('/summary', healthController.getHealthSummary);

module.exports = router;
