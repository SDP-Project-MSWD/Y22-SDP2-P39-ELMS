const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const employeeController = require('../controllers/employeeController');
const managerController = require('../controllers/managerController');

router.post('/', verifyToken, employeeController.setLeaveRequest);
router.get('/:empID', verifyToken, employeeController.getLeaveRequests);
router.get('/leave/inprogress',verifyToken, managerController.getInProgess);
router.get('/leave/accepted',verifyToken, managerController.getAccepted);
router.get('/leave/rejected',verifyToken, managerController.getRejected);
router.put('/leave/reject/:id', verifyToken, managerController.rejectALeaveRequest );
router.put('/leave/accept/:id', verifyToken, managerController.acceptALeaveRequest);

module.exports = router;
