const asyncHandler = require('express-async-handler');
const Transport = require('../models/Transport');

// @desc    Get all transport routes
// @route   GET /api/transport
// @access  Private
const getRoutes = asyncHandler(async (req, res) => {
    const routes = await Transport.find({ school: req.schoolId });
    res.json(routes);
});

// @desc    Create a transport route
// @route   POST /api/transport
// @access  Private/Admin
const createRoute = asyncHandler(async (req, res) => {
    const { routeName, vehicleNumber, driverName, driverPhone, stops } = req.body;

    const route = await Transport.create({
        school: req.schoolId,
        routeName,
        vehicleNumber,
        driverName,
        driverPhone,
        stops
    });

    res.status(201).json(route);
});

// @desc    Update a transport route
// @route   PUT /api/transport/:id
// @access  Private/Admin
const updateRoute = asyncHandler(async (req, res) => {
    const route = await Transport.findOne({ _id: req.params.id, school: req.schoolId });

    if (route) {
        route.routeName = req.body.routeName || route.routeName;
        route.vehicleNumber = req.body.vehicleNumber || route.vehicleNumber;
        route.driverName = req.body.driverName || route.driverName;
        route.driverPhone = req.body.driverPhone || route.driverPhone;
        route.stops = req.body.stops || route.stops;

        const updatedRoute = await route.save();
        res.json(updatedRoute);
    } else {
        res.status(404);
        throw new Error('Route not found');
    }
});

// @desc    Delete a transport route
// @route   DELETE /api/transport/:id
// @access  Private/Admin
const deleteRoute = asyncHandler(async (req, res) => {
    const route = await Transport.findOne({ _id: req.params.id, school: req.schoolId });

    if (route) {
        await route.deleteOne();
        res.json({ message: 'Route removed' });
    } else {
        res.status(404);
        throw new Error('Route not found');
    }
});

module.exports = {
    getRoutes,
    createRoute,
    updateRoute,
    deleteRoute
};
