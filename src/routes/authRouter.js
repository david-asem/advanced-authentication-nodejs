const express = require('express');
const authRouter = express.Router();
const {register, login, forgotPassword, resetPassword}=require('../controllers/authController')


authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/forgotpassword', forgotPassword);

authRouter.put('/resetpassword/:resetToken', resetPassword);


module.exports = authRouter;