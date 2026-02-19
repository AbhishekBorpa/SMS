const express = require('express');
const router = express.Router();
const { getRoutes, createRoute, updateRoute, deleteRoute } = require('../controllers/transportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getRoutes);
router.post('/', protect, admin, createRoute);
router.put('/:id', protect, admin, updateRoute);
router.delete('/:id', protect, admin, deleteRoute);

module.exports = router;
