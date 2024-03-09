const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    empID: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    dob: {type: String, required: true},
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Simple regex to validate phone numbers
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    designation: {type: String, required: true, enum: ["Admin","Manager", "Team Lead", "Employee"]}
 });
module.exports = mongoose.model('User', userSchema);