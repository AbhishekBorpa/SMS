const express = require('express');
const router = express.Router();
const { getMenu, placeOrder, getMyOrders, seedMenu } = require('../controllers/canteenController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/menu', protect, getMenu);
router.post('/order', protect, placeOrder);
router.get('/orders', protect, getMyOrders);
router.post('/seed', protect, admin, seedMenu);

module.exports = router;
