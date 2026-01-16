const mongoose = require('mongoose');

const transportSchema = mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    routeName: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    driverPhone: {
        type: String,
        required: true
    },
    stops: [{
        station: { type: String, required: true },
        time: { type: String, required: true } // e.g. "07:30 AM"
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Transport', transportSchema);
