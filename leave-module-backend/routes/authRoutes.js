const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const authController = require('../controllers/authControllers');

router.post('/register', authController.userRegister);
router.get('/getAllUsers',verifyToken, authController.getAllUsers);
router.put('/:empID', verifyToken, authController.updateUser);
router.delete('/:empID', verifyToken, authController.deleteUser);
router.post('/login', authController.userLogin);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:id/:token',authController.resetPassword);
router.get('/profile/:empID', verifyToken , authController.getProfile) ;
router.put('/profile/:empID', verifyToken  , authController.editProfile);

module.exports = router;