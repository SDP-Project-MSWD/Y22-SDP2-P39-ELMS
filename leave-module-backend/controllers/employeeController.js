const Leave = require('../models/Leave');

const leaveLimits = {
    SICK: 7,
    EARNED: 10,
    CASUAL: 3,
    SPECIAL: 7
};

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
            leaveStartDate: { $lte: endDate },
            leaveEndDate: { $gte: startDate },
            leaveStatus: "Accepted"
        });

        if (existingLeave) {
            return res.status(400).json({ error: 'Duplicate leave request or overlapping dates. Please check your dates.' });
        }

        // Check leave limits
        const leavesThisYear = await Leave.countDocuments({
            empID,
            leaveType,
            leaveStartDate: { $gte: new Date(`${new Date().getFullYear()}-01-01`) },
            leaveStatus: "Accepted"
        });

        if (leaveType !== "SICK" && leavesThisYear >= leaveLimits[leaveType]) {
            return res.status(400).json({ error: `You have reached the limit for ${leaveType} leaves this year` });
        }

        // Check if the leave is casual and it exceeds 3 leaves in a month
        if (leaveType === "CASUAL") {
            // Calculate the start and end dates for the current month
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const firstDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
            const lastDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate()}`;
        
            // Count the number of casual leaves taken in the current month
            const leavesThisMonth = await Leave.countDocuments({
                empID,
                leaveType: "CASUAL",
                leaveStartDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
                leaveStatus: "Accepted"
            });
        
            if (leavesThisMonth >= 3) {
                return res.status(400).json({ error: "You cannot apply for more than 3 casual leaves in a month" });
            }
        }
        // Create and save the new leave request
        const leave = new Leave({ empID, leaveType, leaveReason, leaveStartDate, leaveEndDate, leaveStatus: "In Progress" });
        await leave.save();
        
        // Return success message
        res.status(200).json({ message: "Leave request created successfully" });
    } catch (error) {
        // Handle any errors
        console.error("Error creating leave request:", error);
        res.status(500).json({ error: "Internal server error", error: error.toString() });
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
