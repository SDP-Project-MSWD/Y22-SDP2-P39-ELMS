const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const employeeController = require('../controllers/employeeController');
const managerController = require('../controllers/managerController');

router.get('/leave/getAllLeaves',verifyToken, managerController.getAllLevaes);
router.put('/leave/reject/:id', verifyToken, managerController.rejectALeaveRequest );
router.put('/leave/accept/:id', verifyToken, managerController.acceptALeaveRequest);

module.exports = router;
