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
    let targets = [];

    if (currentUser.role === 'Admin') {
        // Admin sees everyone in the school
        targets = await User.find({
            school: req.schoolId,
            _id: { $ne: currentUser._id }
        }).select('name email role avatar');

    } else if (currentUser.role === 'Teacher') {
        // Teacher: Sees Admins + Students in their classes
        const admins = await User.find({ school: req.schoolId, role: 'Admin' }).select('name email role avatar');

        // Find classes taught by this teacher
        const classes = await require('../models/Class').find({ teacher: currentUser._id });
        const studentIds = classes.reduce((acc, curr) => [...acc, ...curr.students], []);

        const students = await User.find({ _id: { $in: studentIds } }).select('name email role avatar');

        targets = [...admins, ...students];

    } else if (currentUser.role === 'Student') {
        // Student: Sees Admins + Their Class Teacher
        const admins = await User.find({ school: req.schoolId, role: 'Admin' }).select('name email role avatar');

        // Find student's class
        const studentClass = await require('../models/Class').findOne({ students: currentUser._id });
        let teachers = [];

        if (studentClass && studentClass.teacher) {
            const classTeacher = await User.findById(studentClass.teacher).select('name email role avatar');
            if (classTeacher) teachers.push(classTeacher);
        }

        targets = [...admins, ...teachers];
    }

    // Remove duplicates just in case
    const uniqueTargets = Array.from(new Set(targets.map(a => a._id.toString())))
        .map(id => targets.find(a => a._id.toString() === id));

    res.json(uniqueTargets);
});

module.exports = {
    sendMessage,
    getConversation,
    getChatTargets
};
