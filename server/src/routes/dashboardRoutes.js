// Dashboard Routes
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

// All dashboard routes require authentication
router.use(protect);

// Dashboard endpoints
router.get('/', dashboardController.getDashboard);

module.exports = router;
