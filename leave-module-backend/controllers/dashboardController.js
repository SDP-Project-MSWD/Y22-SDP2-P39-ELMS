const Leave = require('../models/Leave');
const User = require("../models/Users");

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

        const leavesCountTotal = await Leave.countDocuments({ empID: empID });
        //console.log(leaves);
        // Combine all data into one JSON object
        const dashboardData = {
            totalLeavesApplied: {
                inProgress: totalLeaves.find(item => item._id === "In Progress")?.count || 0,
                accepted: totalLeaves.find(item => item._id === "Accepted")?.count || 0,
                rejected: totalLeaves.find(item => item._id === "Rejected")?.count || 0
            },
            typeLeaves: {
                SICK: leaves.filter(item => item.leaveType === "SICK" && (item.leaveStatus === "In Progress" || item.leaveStatus === "Accepted")).length || 0,
                EARNED: leaves.filter(item => item.leaveType === "EARNED" && (item.leaveStatus === "In Progress" || item.leaveStatus === "Accepted")).length || 0,
                CASUAL: leaves.filter(item => item.leaveType === "CASUAL" && (item.leaveStatus === "In Progress" || item.leaveStatus === "Accepted")).length || 0,
                SPECIAL: leaves.filter(item => item.leaveType === "SPECIAL" && (item.leaveStatus === "In Progress" || item.leaveStatus === "Accepted")).length || 0,
            },
            leavesTakenThisMonth,
            leavesAppliedThisMonth,
            leavesCountTotal,
            leaveLimits
        };
        // Return the dashboard data as JSON object
        res.status(200).json(dashboardData);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ error: "Internal server error", error: error.toString() });
    }
};


exports.getAdminDashboard = async (req, res) => {
    try {
        // Fetch total users other than admin with their designations
        const users = await User.find({ designation: { $ne: "Admin" } });

        // Count the number of managers, team leads, and employees
        const usersCount = {
            Manager: users.filter(user => user.designation === 'Manager').length,
            TeamLead: users.filter(user => user.designation === 'Team Lead').length,
            Employee: users.filter(user => user.designation === 'Employee').length
        };

        // Get today's date
        const today = new Date();

        // Find managers, team leads, and employees who are on leave today
        const managersOnLeaveToday = await Leave.countDocuments({
            leaveStartDate: { $lte: today },
            leaveEndDate: { $gte: today },
            empID: { $in: users.filter(user => user.designation === 'Manager').map(manager => manager.empID) }
        });
        
        const teamLeadsOnLeaveToday = await Leave.countDocuments({
            leaveStartDate: { $lte: today },
            leaveEndDate: { $gte: today },
            empID: { $in: users.filter(user => user.designation === 'Team Lead').map(teamLead => teamLead.empID) }
        });
        
        const employeesOnLeaveToday = await Leave.countDocuments({
            leaveStartDate: { $lte: today },
            leaveEndDate: { $gte: today },
            empID: { $in: users.filter(user => user.designation === 'Employee').map(employee => employee.empID) }
        });
        
        const companyEmployeesOnLeaveToday = await Leave.countDocuments({
            leaveStartDate: { $lte: today },
            leaveEndDate: { $gte: today }
        });
        const managersOnLeaveTodayEmpID = await Leave.find({
            leaveStartDate: { $lte: today },
            leaveEndDate: { $gte: today },
            empID: { $in: users.filter(user => user.designation === 'Manager').map(manager => manager.empID) }
        }).select('empID'); // Select only the empID field
        
        const teamLeadsOnLeaveTodayEmpID = await Leave.find({
            leaveStartDate: { $lte: today },
            leaveEndDate: { $gte: today },
            empID: { $in: users.filter(user => user.designation === 'Team Lead').map(teamLead => teamLead.empID) }
        }).select('empID'); // Select only the empID field
        
        const employeesOnLeaveTodayEmpID = await Leave.find({
            leaveStartDate: { $lte: today },
            leaveEndDate: { $gte: today },
            empID: { $in: users.filter(user => user.designation === 'Employee').map(employee => employee.empID) }
        }).select('empID'); // Select only the empID field
        
        const companyEmployeesOnLeaveTodayEmpID = await Leave.find({
            leaveStartDate: { $lte: today },
            leaveEndDate: { $gte: today }
        }).select('empID');
        // Return the admin dashboard data as JSON object
        const adminDashboardData = {
            totalUsers: users.length,
            usersCount,
            managersOnLeaveToday,
            managersOnLeaveTodayEmpID,
            teamLeadsOnLeaveToday,
            teamLeadsOnLeaveTodayEmpID,
            employeesOnLeaveToday,
            employeesOnLeaveTodayEmpID,
            companyEmployeesOnLeaveToday,
            companyEmployeesOnLeaveTodayEmpID
        };

        res.status(200).json(adminDashboardData);
    } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        res.status(500).json({ error: "Internal server error", error: error.toString() });
    }
};
