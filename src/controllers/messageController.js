const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
    const { recipientId, content } = req.body;

    if (!recipientId || !content) {
        res.status(400);
        throw new Error('Recipient and content are required');
    }

    const newMessage = await Message.create({
        sender: req.user._id,
        recipient: recipientId,
        content,
        school: req.schoolId
    });

    const io = req.app.get('socketio');
    if (io) {
        io.to(recipientId).emit('message', newMessage);
    }

    res.status(201).json(newMessage);
});

// @desc    Get conversation with a specific user
// @route   GET /api/messages/:userId
// @access  Private
const getConversation = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const messages = await Message.find({
        school: req.schoolId,
        $or: [
            { sender: req.user._id, recipient: userId },
            { sender: userId, recipient: req.user._id }
        ]
    }).sort({ createdAt: 1 });

    res.json(messages);
});

// @desc    Get valid chat targets for the logged in user
// @route   GET /api/messages/targets
// @access  Private
const getChatTargets = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    let query = { school: req.schoolId };

    // Logic for who sees whom:
    // Admin: Sees Everyone
    // Teacher: Sees Admins and Students
    // Student: Sees Admins and Teachers

    if (currentUser.role === 'Admin') {
        query = { _id: { $ne: currentUser._id } }; // All users except self
    } else if (currentUser.role === 'Teacher') {
        query = {
            _id: { $ne: currentUser._id },
            role: { $in: ['Admin', 'Student'] }
        };
    } else if (currentUser.role === 'Student') {
        query = {
            _id: { $ne: currentUser._id },
            role: { $in: ['Admin', 'Teacher'] }
        };
    }

    const targets = await User.find(query).select('name email role');
    res.json(targets);
});

module.exports = {
    sendMessage,
    getConversation,
    getChatTargets
};
