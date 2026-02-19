const asyncHandler = require('express-async-handler');
const Notice = require('../models/Notice');
const User = require('../models/User');
const { Expo } = require('expo-server-sdk');

// @desc    Create a new notice
// @route   POST /api/notices
// @access  Private (Admin Only)
// @desc    Create a new notice
// @route   POST /api/notices
// @access  Private (Admin Only)
// @desc    Create a new notice
// @route   POST /api/notices
// @access  Private (Admin Only)
const createNotice = asyncHandler(async (req, res) => {
    const { title, message, targetAudience, targetClassId } = req.body;

    const notice = await Notice.create({
        title,
        message,
        targetAudience,
        targetClass: targetClassId || null,
        postedBy: req.user._id,
        school: req.schoolId
    });

    // --- PUSH NOTIFICATION LOGIC ---
    try {
        let query = { school: req.schoolId };

        // Filter by Role
        if (targetAudience !== 'All') {
            query.role = targetAudience;
        }

        // Filter by Class (if applicable and audience is Student)
        if (targetClassId) {
            const classDoc = await require('../models/Class').findById(targetClassId);
            if (classDoc && classDoc.students) {
                query._id = { $in: classDoc.students };
            }
        }

        const users = await User.find(query).select('expoPushToken');
        const tokens = users.map(u => u.expoPushToken).filter(token => Expo.isExpoPushToken(token));

        if (tokens.length > 0) {
            const expo = new Expo();
            let messages = [];
            for (let pushToken of tokens) {
                messages.push({
                    to: pushToken,
                    sound: 'default',
                    title: `📢 New Notice: ${title}`,
                    body: message,
                    data: { noticeId: notice._id },
                });
            }

            let chunks = expo.chunkPushNotifications(messages);
            for (let chunk of chunks) {
                try {
                    await expo.sendPushNotificationsAsync(chunk);
                } catch (error) {
                    console.error('Error sending push chunk', error);
                }
            }
        }
    } catch (error) {
        console.error('Push notification error:', error);
        // Don't fail the request, just log error
    }
    // -------------------------------

    res.status(201).json(notice);
});

// @desc    Get all notices
// @route   GET /api/notices?classId=...
// @access  Private
const getNotices = asyncHandler(async (req, res) => {
    const { classId } = req.query;
    let query = { school: req.schoolId };

    if (classId) {
        // Show notices for All, OR specific class
        query.$or = [
            { targetClass: classId },
            { targetClass: null }
        ];
    }

    const notices = await Notice.find(query)
        .sort({ createdAt: -1 })
        .populate('postedBy', 'name role')
        .populate('targetClass', 'name');
    res.json(notices);
});

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin Only)
const deleteNotice = asyncHandler(async (req, res) => {
    const notice = await Notice.findOne({ _id: req.params.id, school: req.schoolId });

    if (notice) {
        await notice.deleteOne();
        res.json({ message: 'Notice removed' });
    } else {
        res.status(404);
        throw new Error('Notice not found');
    }
});

module.exports = {
    createNotice,
    getNotices,
    deleteNotice
};
