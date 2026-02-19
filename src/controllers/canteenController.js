const asyncHandler = require('express-async-handler');
const CanteenItem = require('../models/CanteenItem');
const CanteenOrder = require('../models/CanteenOrder');
const { logAction } = require('./auditController');

// @desc    Get menu items
// @route   GET /api/canteen/menu
// @access  Private
const getMenu = asyncHandler(async (req, res) => {
    const items = await CanteenItem.find({ isAvailable: true, school: req.schoolId });
    res.json(items);
});

// @desc    Place order
// @route   POST /api/canteen/order
// @access  Private (Student)
const placeOrder = asyncHandler(async (req, res) => {
    const { items, pickupTime } = req.body; // items: [{itemId, quantity}]

    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('No items in order');
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const i of items) {
        const item = await CanteenItem.findOne({ _id: i.itemId, school: req.schoolId });
        if (item) {
            if (item.stock < i.quantity) {
                res.status(400);
                throw new Error(`Insufficient stock for ${item.name}`);
            }
            orderItems.push({
                item: item._id,
                quantity: i.quantity,
                price: item.price
            });
            totalAmount += item.price * i.quantity;

            // Decrement Stock
            item.stock -= i.quantity;
            if (item.stock === 0) item.isAvailable = false;
            await item.save();
        }
    }

    const order = await CanteenOrder.create({
        student: req.user._id,
        items: orderItems,
        totalAmount,
        pickupTime,
        school: req.schoolId
    });

    if (order) {
        // Here we could deduct from a student wallet if implemented

        await logAction({
            action: 'PLACE_CANTEEN_ORDER',
            entity: 'CanteenOrder',
            entityId: order._id,
            details: { totalAmount },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(order);
    } else {
        res.status(400);
        throw new Error('Order failed');
    }
});

// @desc    Get my orders
// @route   GET /api/canteen/orders
// @access  Private (Student)
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await CanteenOrder.find({ student: req.user._id, school: req.schoolId })
        .populate('items.item', 'name')
        .sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Seed menu (Initial setup helper)
// @route   POST /api/canteen/seed
// @access  Admin
const seedMenu = asyncHandler(async (req, res) => {
    const items = [
        { name: 'Veg Sandwich', price: 50, category: 'Snacks', school: req.schoolId },
        { name: 'Chicken Burger', price: 90, category: 'Meals', school: req.schoolId },
        { name: 'Fruit Juice', price: 40, category: 'Drinks', school: req.schoolId },
        { name: 'Samosa', price: 20, category: 'Snacks', school: req.schoolId },
        { name: 'Lunch Thali', price: 120, category: 'Meals', school: req.schoolId },
    ];
    await CanteenItem.deleteMany({ school: req.schoolId });
    await CanteenItem.insertMany(items);
    res.json({ message: 'Menu seeded' });
});

// @desc    Get all orders (Admin)
// @route   GET /api/canteen/orders/all?classId=...
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const { classId } = req.query;
    let query = { school: req.schoolId };

    if (classId) {
        const classDoc = await require('../models/Class').findById(classId);
        if (classDoc && classDoc.students) {
            query.student = { $in: classDoc.students };
        } else {
            return res.json([]);
        }
    }

    const orders = await CanteenOrder.find(query)
        .populate('student', 'name email')
        .populate('items.item', 'name price')
        .sort({ createdAt: -1 });
    res.json(orders);
});

module.exports = {
    getMenu,
    placeOrder,
    getMyOrders,
    seedMenu,
    getAllOrders
};
