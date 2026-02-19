const mongoose = require('mongoose');

const inventoryItemSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        category: { type: String, required: true }, // e.g., 'Furniture', 'Lab Equipment', 'Stationery'
        quantity: { type: Number, required: true, default: 0 },
        location: { type: String }, // e.g., 'Room 101', 'Chemistry Lab'
        description: { type: String },
        lastUpdatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
