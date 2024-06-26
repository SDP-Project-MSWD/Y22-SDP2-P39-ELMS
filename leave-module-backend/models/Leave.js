const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    empID: { type: String, required: true },
    leaveType: { 
        type: String,
        required: true, 
        enum: ["SICK", "EARNED", "CASUAL", "SPECIAL", "MATERNAL"]
    },
    leaveReason: { type: String, required: true },
    leaveStartDate: { type: Date, required: true },
    leaveEndDate: { type: Date, required: true },
    leaveStatus: { 
        type: String,
        enum: ["Accepted", "Rejected", "In Progress"]
    }
});

module.exports = mongoose.model('Leave', leaveSchema);
