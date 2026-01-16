const express = require('express');
const router = express.Router();
const { getClubs, joinClub, leaveClub, seedClubs } = require('../controllers/clubController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getClubs);
router.post('/:id/join', protect, joinClub);
router.post('/:id/leave', protect, leaveClub);
router.post('/seed', protect, admin, seedClubs);

module.exports = router;
