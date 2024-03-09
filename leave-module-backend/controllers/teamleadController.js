const Leave = require('../models/Leave');

exports.getLeaveRequests = async (req, res) => {
    try {
        const teamLeadID = req.params.teamLeadID; // Assuming team lead ID is passed as a parameter
        const leaves = await Leave.find({ teamLeadID: teamLeadID });
        if (!leaves || leaves.length === 0) { 
            res.status(404).json({ message: 'No leave requests found for the team lead' }); 
        } else { 
            res.status(200).json(leaves); 
        } 
    } catch (error) {
        console.error("Error fetching leaves:", error);
        res.status(500).json({ message: 'Error fetching leaves', error: error.toString() });
    }
}

exports.approveLeaveRequest = async (req, res) => {
    try {
        const leaveID = req.params.leaveID; // Assuming leave ID is passed as a parameter
        const leave = await Leave.findById(leaveID);
        if (!leave) {
            res.status(404).json({ message: 'Leave request not found' });
        } else {
            if (leave.leaveStatus === "Approved") {
                res.status(400).json({ message: 'Leave request already approved' });
            } else {
                leave.leaveStatus = "Approved";
                await leave.save();
                res.status(200).json({ message: 'Leave request approved successfully' });
            }
        }
    } catch (error) {
        console.error("Error approving leave request:", error);
        res.status(500).json({ message: 'Error approving leave request', error: error.toString() });
    }
}

exports.rejectLeaveRequest = async (req, res) => {
    try {
        const leaveID = req.params.leaveID; // Assuming leave ID is passed as a parameter
        const leave = await Leave.findById(leaveID);
        if (!leave) {
            res.status(404).json({ message: 'Leave request not found' });
        } else {
            if (leave.leaveStatus === "Rejected") {
                res.status(400).json({ message: 'Leave request already rejected' });
            } else {
                leave.leaveStatus = "Rejected";
                await leave.save();
                res.status(200).json({ message: 'Leave request rejected successfully' });
            }
        }
    } catch (error) {
        console.error("Error rejecting leave request:", error);
        res.status(500).json({ message: 'Error rejecting leave request', error: error.toString() });
    }
}
