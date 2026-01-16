const express = require('express');
const router = express.Router();
const {
    getInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
} = require('../controllers/inventoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getInventory)
    .post(protect, adminOnly, addInventoryItem);

router.route('/:id')
    .put(protect, adminOnly, updateInventoryItem)
    .delete(protect, adminOnly, deleteInventoryItem);

module.exports = router;
