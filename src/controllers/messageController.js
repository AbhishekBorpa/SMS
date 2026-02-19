const asyncHandler = require('express-async-handler');
const { createAndEmitMessage } = require('../services/messageService'); // Import the new service function

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
    const { recipientId, content } = req.body;

    if (!recipientId || !content) {
        res.status(400);
        throw new Error('Recipient and content are required');
    }

    try {
        const newMessage = await createAndEmitMessage(
            req.app.get('socketio'), // Pass the socket.io instance
            req.user._id,
            recipientId,
            content,
            req.schoolId
        );
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(error.statusCode || 500);
        throw new Error(error.message);
    }
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
    // Admin: Sees Everyone within their school
    // Teacher: Sees Admins and Students within their school
    // Student: Sees Admins and Teachers within their school

    // All roles should be scoped to their school, except potentially SuperAdmin
    // For Admin role, ensure the school filter is maintained.
    if (currentUser.role === 'Admin') {
        query = { ...query, _id: { $ne: currentUser._id } }; // All users except self, within their school
    } else if (currentUser.role === 'Teacher') {
        query = {
            ...query,
            _id: { $ne: currentUser._id },
            role: { $in: ['Admin', 'Student'] }
        };
    } else if (currentUser.role === 'Student') {
        query = {
            ...query,
            _id: { $ne: currentUser._id },
            role: { $in: ['Admin', 'Teacher'] }
        };
    } else if (currentUser.role === 'SuperAdmin') {
        // SuperAdmin can see all users across all schools.
        // This case would bypass the school filter.
        // If SuperAdmin should also be scoped, remove this else if block.
        query = { _id: { $ne: currentUser._id } };
    }

    const targets = await User.find(query).select('name email role');
    res.json(targets);
});

module.exports = {
    sendMessage,
    getConversation,
    getChatTargets
};
