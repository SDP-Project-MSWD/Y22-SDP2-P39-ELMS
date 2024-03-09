const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const employeeController = require('../controllers/employeeController');

router.post('/', verifyToken, employeeController.setLeaveRequest);
router.get('/:empID', verifyToken, employeeController.getLeaveRequests);

module.exports = router;
