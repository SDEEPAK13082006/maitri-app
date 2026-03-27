// Chat Routes
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

// All chat routes require authentication
router.use(protect);

// Chat endpoints
router.post('/send', chatController.sendMessage);
router.get('/history', chatController.getChatHistory);
router.post('/conversation', chatController.createConversation);
router.get('/conversation/:conversationId', chatController.getConversation);

module.exports = router;
