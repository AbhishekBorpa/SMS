const mongoose = require('mongoose');

const canteenItemSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        price: { type: Number, required: true },
        category: { type: String, enum: ['Snacks', 'Drinks', 'Meals'], default: 'Snacks' },
        isAvailable: { type: Boolean, default: true },
        stock: { type: Number, default: 0 },
        image: { type: String }, // URL or placeholder
    },
    {
        timestamps: true,
    }
);

const CanteenItem = mongoose.model('CanteenItem', canteenItemSchema);

module.exports = CanteenItem;
