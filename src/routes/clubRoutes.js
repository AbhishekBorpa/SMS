const express = require('express');
const router = express.Router();
const {
    getClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub,
    joinClub,
    leaveClub,
    seedClubs
} = require('../controllers/clubController');
const { protect, admin } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.route('/')
    .get(protect, getClubs)
    .post(protect, adminOrTeacher, createClub);

router.route('/:id')
    .get(protect, getClubById)
    .put(protect, adminOrTeacher, updateClub)
    .delete(protect, adminOrTeacher, deleteClub);

router.post('/:id/join', protect, joinClub);
router.post('/:id/leave', protect, leaveClub);
router.post('/seed', protect, admin, seedClubs);

module.exports = router;
