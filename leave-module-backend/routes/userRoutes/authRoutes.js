const express = require('express');
const router = express.Router();
const authController = require('../../controllers/userController/authControllers');

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:id/:token',authController.resetPassword);

module.exports = router;