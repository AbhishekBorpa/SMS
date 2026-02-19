const mongoose = require('mongoose');

const alumniSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        email: { type: String },
        mobileNumber: { type: String },
        graduationYear: { type: Number, required: true },
        currentCompany: { type: String },
        designation: { type: String },
        linkedInProfile: { type: String },
        image: { type: String }, // URL
    },
    {
        timestamps: true,
    }
);

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
