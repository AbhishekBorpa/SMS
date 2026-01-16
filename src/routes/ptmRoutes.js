const express = require('express');
const router = express.Router();
const { getTeacherSlots, createSlots, updateSlot } = require('../controllers/ptmController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTeacherSlots)
    .post(protect, createSlots);

router.put('/:id', protect, updateSlot);

module.exports = router;
