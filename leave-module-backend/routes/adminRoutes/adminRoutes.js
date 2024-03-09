const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController/adminControllers');

router.post('/register', adminController.adminRegister);
router.post('/login', adminController.adminLogin);

module.exports = router;