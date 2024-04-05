const Leave = require('../models/Leave');

exports.getAllLevaes = async (req,res) => {
  try{
    const allLeaves = await Leave.find({ leaveStatus: { $in: ['In Progress', 'Rejected', 'Accepted'] } });
    res.json(allLeaves);
  }catch(error){
    res.status(500).json({message: error.message});
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
  