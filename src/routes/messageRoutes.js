const express = require('express');
const router = express.Router();
const { sendMessage, getConversation, getChatTargets } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');


router.get('/targets', protect, getChatTargets);
router.get('/:userId', protect, getConversation);

module.exports = router;
