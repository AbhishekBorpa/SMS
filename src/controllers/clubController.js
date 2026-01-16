const asyncHandler = require('express-async-handler');
const Club = require('../models/Club');
const { logAction } = require('./auditController');

// @desc    Get all clubs
// @route   GET /api/clubs
// @access  Private
const getClubs = asyncHandler(async (req, res) => {
    const clubs = await Club.find({ school: req.schoolId })
        .populate('president', 'name')
        .populate('facultyAdvisor', 'name');
    res.json(clubs);
});

// @desc    Join a club
// @route   POST /api/clubs/:id/join
// @access  Private (Student)
const joinClub = asyncHandler(async (req, res) => {
    const club = await Club.findOne({ _id: req.params.id, school: req.schoolId });

    if (club) {
        if (club.members.includes(req.user._id)) {
            res.status(400);
            throw new Error('Already a member');
        }

        club.members.push(req.user._id);
        await club.save();

        await logAction({
            action: 'JOIN_CLUB',
            entity: 'Club',
            entityId: club._id,
            details: { clubName: club.name },
            performedBy: req.user._id,
            req
        });

        res.json({ message: 'Joined club successfully', club });
    } else {
        res.status(404);
        throw new Error('Club not found');
    }
});

// @desc    Leave a club
// @route   POST /api/clubs/:id/leave
// @access  Private (Student)
const leaveClub = asyncHandler(async (req, res) => {
    const club = await Club.findOne({ _id: req.params.id, school: req.schoolId });

    if (club) {
        club.members = club.members.filter(memberId => memberId.toString() !== req.user._id.toString());
        await club.save();
        res.json({ message: 'Left club successfully' });
    } else {
        res.status(404);
        throw new Error('Club not found');
    }
});

// @desc    Seed clubs (Initial setup)
// @route   POST /api/clubs/seed
// @access  Admin
const seedClubs = asyncHandler(async (req, res) => {
    const clubs = [
        { name: 'Robotics Club', description: 'Building the future, one bot at a time.', meetingDay: 'Friday', meetingTime: '3:00 PM', school: req.schoolId },
        { name: 'Debate Society', description: 'Voice your opinion and sharpen your mind.', meetingDay: 'Wednesday', meetingTime: '2:30 PM', school: req.schoolId },
        { name: 'Eco Warriors', description: 'Making our school and planet greener.', meetingDay: 'Monday', meetingTime: '3:30 PM', school: req.schoolId },
        { name: 'Music Band', description: 'Rock out and learn instruments.', meetingDay: 'Thursday', meetingTime: '4:00 PM', school: req.schoolId },
        { name: 'Coding Club', description: 'Learn to code apps and websites.', meetingDay: 'Tuesday', meetingTime: '3:00 PM', school: req.schoolId },
    ];

    // Check if clubs exist to avoid dupes on re-seed per school
    const count = await Club.countDocuments({ school: req.schoolId });
    if (count === 0) {
        await Club.insertMany(clubs);
        res.json({ message: 'Clubs seeded' });
    } else {
        res.json({ message: 'Clubs already exist' });
    }
});

module.exports = {
    getClubs,
    joinClub,
    leaveClub,
    seedClubs
};
