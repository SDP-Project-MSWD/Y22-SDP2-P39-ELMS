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

        // Convert string dates to Date objects in the format YYYY-MM-DD
        const startDate = new Date(leaveStartDate);
        const endDate = new Date(leaveEndDate);

        // Check if start date is before end date
        if (startDate >= endDate) {
            return res.status(400).json({ error: "Leave start date must be before leave end date" });
        }

        const overlappingLeave = await Leave.findOne({
            empID,
            leaveStatus: "Accepted",
            $or: [
                {
                    leaveStartDate: { $lte: endDate },
                    leaveEndDate: { $gte: startDate }
                },
                {
                    leaveStartDate: { $gte: startDate, $lte: endDate }
                }
            ]
        });

        if (overlappingLeave) {
            return res.status(400).json({ error: "You have already applied for leave within the same range which has been accepted" });
        }

        // Check leave limits for the particular leave type
        const leavesThisYear = await Leave.countDocuments({
            empID,
            leaveType,
            leaveStartDate: { $gte: new Date(`${new Date().getFullYear()}-01-01`) },
            leaveStatus: "Accepted"
        });

        if (leavesThisYear >= leaveLimits[leaveType]) {
            return res.status(400).json({ error: `You have reached the limit for ${leaveType} leaves this year` });
        }

        // Check if the leave is casual and it exceeds 3 leaves in a month
        if (leaveType !== "SICK" && leaveType === "CASUAL") {
            // Calculate the start and end dates for the current month
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
            const lastDateOfMonth = getLastDayOfMonth(currentYear, currentMonth - 1);
            const lastDayOfMonth = new Date(currentYear, currentMonth - 1, lastDateOfMonth);
            
            // Count the total leaves taken in the current month for all leave types other than SICK
            const leavesThisMonth = await Leave.countDocuments({
                empID,
                leaveType: { $ne: "SICK" },
                leaveStartDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
                leaveStatus: { $in: ["Accepted", "In Progress"] }
            });

            // Check if total leaves taken in the month exceed 3
            if (leavesThisMonth >= 3) {
                return res.status(400).json({ error: "You cannot apply for more than 3 leaves in a month" });
            }
        }

        // Create and save the new leave request
        const leave = new Leave({ empID, leaveType, leaveReason, leaveStartDate: startDate, leaveEndDate: endDate, leaveStatus: "In Progress" });
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


const getLastDayOfMonth = (year, month) => {
    // February has 29 days in leap years, 28 otherwise
    if (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
        return 29;
    } else {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysInMonth[month];
    }
};
