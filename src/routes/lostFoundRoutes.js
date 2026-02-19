const express = require('express');
const router = express.Router();
const { getItems, reportItem, resolveItem } = require('../controllers/lostFoundController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getItems)
    .post(protect, reportItem);

router.put('/:id/resolve', protect, resolveItem);

module.exports = router;
