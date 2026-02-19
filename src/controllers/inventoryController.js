const asyncHandler = require('express-async-handler');
const InventoryItem = require('../models/InventoryItem');
const { logAction } = require('./auditController');

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private (Admin/Teacher)
const getInventory = asyncHandler(async (req, res) => {
    const items = await InventoryItem.find({ school: req.schoolId }).sort({ category: 1, name: 1 });
    res.json(items);
});

// @desc    Add new inventory item
// @route   POST /api/inventory
// @access  Private (Admin)
const addInventoryItem = asyncHandler(async (req, res) => {
    const { name, category, quantity, location, description } = req.body;

    const item = await InventoryItem.create({
        name,
        category,
        quantity,
        location,
        description,
        school: req.schoolId,
        lastUpdatedBy: req.user._id,
    });

    if (item) {
        await logAction({
            action: 'ADD_INVENTORY',
            entity: 'InventoryItem',
            entityId: item._id,
            details: { name, quantity },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(item);
    } else {
        res.status(400);
        throw new Error('Invalid inventory data');
    }
});

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private (Admin)
const updateInventoryItem = asyncHandler(async (req, res) => {
    const { name, category, quantity, location, description } = req.body;
    const item = await InventoryItem.findOne({ _id: req.params.id, school: req.schoolId });

    if (item) {
        const oldQty = item.quantity;
        item.name = name || item.name;
        item.category = category || item.category;
        item.quantity = quantity !== undefined ? quantity : item.quantity;
        item.location = location || item.location;
        item.description = description || item.description;
        item.lastUpdatedBy = req.user._id;

        const updatedItem = await item.save();

        await logAction({
            action: 'UPDATE_INVENTORY',
            entity: 'InventoryItem',
            entityId: updatedItem._id,
            details: { name: updatedItem.name, oldQty, newQty: updatedItem.quantity },
            performedBy: req.user._id,
            req
        });

        res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private (Admin)
const deleteInventoryItem = asyncHandler(async (req, res) => {
    const item = await InventoryItem.findOne({ _id: req.params.id, school: req.schoolId });

    if (item) {
        await item.remove();
        await logAction({
            action: 'DELETE_INVENTORY',
            entity: 'InventoryItem',
            entityId: req.params.id,
            details: { name: item.name },
            performedBy: req.user._id,
            req
        });
        res.json({ message: 'Item removed' });
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

module.exports = {
    getInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
};
