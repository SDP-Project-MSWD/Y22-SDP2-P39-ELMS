const Leave = require('../models/Leave');

exports.setLeaveRequest = async (req, res) => {
    try {
        const { empID, leaveType, leaveReason, leaveStartDate, leaveEndDate } = req.body;

        // Convert string dates to Date objects
        const startDate = new Date(leaveStartDate);
        const endDate = new Date(leaveEndDate);

        // Check if start date is before end date
        if (startDate >= endDate) {
            return res.status(400).json({ error: "Leave start date must be before leave end date" });
        }

        // Check if there is an existing leave request for the same employee and overlapping dates
        const existingLeave = await Leave.findOne({
            empID,
            leaveStartDate,
            leaveEndDate,
          });
          if (existingLeave) {
            return res.status(400).json({ error: 'Duplicate leave request. Please check your dates.' });
          }
        // Create and save the new leave request
        const leave = new Leave({ empID, leaveType, leaveReason, leaveStartDate, leaveEndDate, leaveStatus: "In Progress" });
        await leave.save();
        
        // Return success message
        res.status(200).json({ message: "Leave request created successfully" });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: "Internal server error" , error});
    }
}


exports.getLeaveRequests = async (req, res) => {
    try {
        const empID = req.params.empID; // Corrected from req.params.id
        const leaves = await Leave.find({ empID: empID });
        if (!leaves || leaves.length === 0) { 
            res.status(404).json({ message: 'No leave requests found for the employee' }); 
        } else { 
            res.status(200).json(leaves); 
        } 
    } catch (error) {
        console.error("Error fetching leaves:", error);
        res.status(500).json({ message: 'Error fetching leaves', error: error.toString() });
    }
}
