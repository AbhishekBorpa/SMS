const Message = require('../models/Message');
const User = require('../models/User');

const createAndEmitMessage = async (io, senderId, recipientId, content, schoolId) => {
    // Verify recipient belongs to the same school
    const recipientUser = await User.findById(recipientId);
    if (!recipientUser || recipientUser.school.toString() !== schoolId.toString()) {
        const error = new Error('Cannot send message to a user outside your school');
        error.statusCode = 403;
        throw error;
    }

    const newMessage = await Message.create({
        sender: senderId,
        recipient: recipientId,
        content,
        school: schoolId
    });

    if (io) {
        // Emit message to recipient's room
        io.to(recipientId.toString()).emit('message', newMessage);
        // Also emit message to sender's room so they see their own message in real-time
        io.to(senderId.toString()).emit('message', newMessage);
    }
    
    return newMessage;
};

module.exports = {
    createAndEmitMessage
};