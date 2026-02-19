const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema(
    {
        action: { type: String, required: true }, // e.g., 'CREATE_USER', 'UPDATE_FEE'
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        entity: { type: String, required: true }, // e.g., 'User', 'Course'
        entityId: { type: String }, // ID of the affected document
        details: { type: Object }, // JSON object with changes or snapshot
        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        ipAddress: { type: String },
        userAgent: { type: String },
    },
    {
        timestamps: true,
    }
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
