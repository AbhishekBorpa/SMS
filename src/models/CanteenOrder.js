const mongoose = require('mongoose');

const canteenOrderSchema = mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        items: [
            {
                item: { type: mongoose.Schema.Types.ObjectId, ref: 'CanteenItem' },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true } // Price at time of order
            }
        ],
        totalAmount: { type: Number, required: true },
        status: { type: String, enum: ['Pending', 'Ready', 'Completed', 'Cancelled'], default: 'Pending' },
        pickupTime: { type: String }, // e.g. "Lunch Break"
    },
    {
        timestamps: true,
    }
);

const CanteenOrder = mongoose.model('CanteenOrder', canteenOrderSchema);

module.exports = CanteenOrder;
