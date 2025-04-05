const express = require('express');
const router = express.Router();
const { sendMessage, getConversation, getInbox } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// Send a message
router.post('/', protect, sendMessage);

// Get conversation with another user
router.get('/conversation/:userId', protect, getConversation);

// Get inbox
router.get('/inbox', protect, getInbox);

module.exports = router;
