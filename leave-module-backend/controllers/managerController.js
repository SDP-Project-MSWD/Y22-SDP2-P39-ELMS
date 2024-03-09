const Leave = require('../models/Leave');

exports.getInProgess = async (req, res) => {
    try {
        const acceptedLeaves = await Leave.find({ leaveStatus: 'In Progress' });
        res.json(acceptedLeaves);
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAccepted = async (req, res) => {
    try {
        const acceptedLeaves = await Leave.find({ leaveStatus: 'Accepted' });
        res.json(acceptedLeaves);
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getRejected = async (req, res) => {
    try {
        const rejectedLeaves = await Leave.find({ leaveStatus: 'Rejected' });
        res.json(rejectedLeaves);
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.acceptALeaveRequest = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (leave) {
          leave.leaveStatus = 'Accepted';
          await leave.save();
          res.json({ message: 'Leave request accepted' });
        } else {
          res.status(404).json({ message: 'Leave request not found' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.rejectALeaveRequest = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (leave) {
          leave.leaveStatus = 'Rejected';
          await leave.save();
          res.json({ message: 'Leave request rejected' });
        } else {
          res.status(404).json({ message: 'Leave request not found' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
  