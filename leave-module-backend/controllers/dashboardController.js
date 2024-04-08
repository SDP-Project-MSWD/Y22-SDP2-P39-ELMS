const Leave = require('../models/Leave');

exports.getDashboardData = async (req, res) => {
    try {
        const empID = req.params.empID;

        // Get total leaves applied (In-progress, Accepted, Rejected)
        const totalLeaves = await Leave.aggregate([
            { $match: { empID } },
            {
                $group: {
                    _id: "$leaveStatus",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get leaves taken currently this month
        const currentYear = new Date().getFullYear(); // Get current year
        const currentMonth = new Date().getMonth() + 1; // Get current month (1-indexed)

        // Calculate the first day of the current month
        const firstDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;

        // Calculate the last day of the current month
        const lastDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate()}`;

        const leavesTakenThisMonth = await Leave.countDocuments({
            empID,
            leaveStartDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
            leaveStatus: "Accepted"
        });

        const leavesAppliedThisMonth = await Leave.find({
            empID,
            leaveStartDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        });

        // Get limits of leaves (range of each type of leave)
        const leaveLimits = {
            SICK: 7,
            EARNED: 10,
            CASUAL: 3,
            SPECIAL: 7
        };

        const leaves = await Leave.find({ empID: empID});
        //console.log(leaves);
        // Combine all data into one JSON object
        const dashboardData = {
            totalLeavesApplied: {
                inProgress: totalLeaves.find(item => item._id === "In Progress")?.count || 0,
                accepted: totalLeaves.find(item => item._id === "Accepted")?.count || 0,
                rejected: totalLeaves.find(item => item._id === "Rejected")?.count || 0
            },
            typeLeaves: {
                SICK: leaves.filter(item => item.leaveType === "SICK").length || 0,
                EARNED: leaves.filter(item => item.leaveType === "EARNED").length || 0,
                CASUAL: leaves.filter(item => item.leaveType === "CASUAL").length || 0,
                SPECIAL: leaves.filter(item => item.leaveType === "SPECIAL").length || 0,
            },
            leavesTakenThisMonth,
            leavesAppliedThisMonth,
            leaveLimits
        };
        // Return the dashboard data as JSON object
        res.status(200).json(dashboardData);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ error: "Internal server error", error: error.toString() });
    }
};
