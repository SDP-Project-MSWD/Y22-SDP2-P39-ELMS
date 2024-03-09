const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
    empID: { type: String, required: true },
    leaveType: { type: String,required: true },
    leaveReason: { type: String, required: true },
    leaveStartDate: { type: String, required: true},
    leaveEndDate: {type: String, required: true},
 });
module.exports = mongoose.model('Leave', leaveSchema);
