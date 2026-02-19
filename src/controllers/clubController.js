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

// @desc    Get a single club by ID
// @route   GET /api/clubs/:id
// @access  Private
const getClubById = asyncHandler(async (req, res) => {
    const club = await Club.findOne({ _id: req.params.id, school: req.schoolId })
        .populate('president', 'name')
        .populate('facultyAdvisor', 'name')
        .populate('members', 'name');

    if (club) {
        res.json(club);
    } else {
        res.status(404);
        throw new Error('Club not found');
    }
});

// @desc    Create a new club
// @route   POST /api/clubs
// @access  Admin or Teacher
const createClub = asyncHandler(async (req, res) => {
    const { name, description, meetingDay, meetingTime, facultyAdvisor } = req.body;

    const club = new Club({
        name,
        description,
        meetingDay,
        meetingTime,
        facultyAdvisor,
        school: req.schoolId,
    });

    const createdClub = await club.save();

    await logAction({
        action: 'CREATE_CLUB',
        entity: 'Club',
        entityId: createdClub._id,
        details: { clubName: createdClub.name },
        performedBy: req.user._id,
        req
    });

    res.status(201).json(createdClub);
});

// @desc    Update a club
// @route   PUT /api/clubs/:id
// @access  Admin or Teacher
const updateClub = asyncHandler(async (req, res) => {
    const { name, description, meetingDay, meetingTime, president, facultyAdvisor } = req.body;

    const club = await Club.findOne({ _id: req.params.id, school: req.schoolId });

    if (club) {
        club.name = name || club.name;
        club.description = description || club.description;
        club.meetingDay = meetingDay || club.meetingDay;
        club.meetingTime = meetingTime || club.meetingTime;
        club.president = president || club.president;
        club.facultyAdvisor = facultyAdvisor || club.facultyAdvisor;

        const updatedClub = await club.save();

        await logAction({
            action: 'UPDATE_CLUB',
            entity: 'Club',
            entityId: updatedClub._id,
            details: { clubName: updatedClub.name },
            performedBy: req.user._id,
            req
        });

        res.json(updatedClub);
    } else {
        res.status(404);
        throw new Error('Club not found');
    }
});

// @desc    Delete a club
// @route   DELETE /api/clubs/:id
// @access  Admin or Teacher
const deleteClub = asyncHandler(async (req, res) => {
    const club = await Club.findOne({ _id: req.params.id, school: req.schoolId });

    if (club) {
        await club.remove();

        await logAction({
            action: 'DELETE_CLUB',
            entity: 'Club',
            entityId: club._id,
            details: { clubName: club.name },
            performedBy: req.user._id,
            req
        });

        res.json({ message: 'Club removed' });
    } else {
        res.status(404);
        throw new Error('Club not found');
    }
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
        { name: 'Eco Warriors', description: 'Making our school and planet greener.', meetingDay: 'Monday', meetingTime: '3:30 PM', school: schoolId },
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
    getClubById,
    createClub,
    updateClub,
    deleteClub,
    joinClub,
    leaveClub,
    seedClubs
};
