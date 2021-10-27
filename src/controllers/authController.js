const User = require('../models/Users');
const ErrorHandlers = require('../services/errorHandlers');
//route functions
async function register(req, res, next) {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username, email, password,
    });
    return res.status(201).json({
      success: true,
      message:'registration successful',
      user,
    });
  } catch (error) {
    next(error);
  }
  
};

//login function
async function login(req, res, next) {
  const { email, password} = req.body;
  if (!email || !password) {
    return next(new ErrorHandlers('Please provide an email and a password', 400));
  } else {
    try {
      const user = await User.findOne({ email }).select('+password');

          if (!user) {
            return next(new ErrorHandlers('Invalide credentials', 401));
          }
      else {
            const isMatch = await user.matchPasswords(password);
            if (!isMatch) {
              return next(new ErrorHandlers('Invalid credentials', 401));
            }     else {
                  return res.status(200).json({
                    success: true,
                    message: 'login successful',
                    token:'79998hjehejw',
                    });
                  }
            }
    } catch (error) {
      return res.status(500).json({
        error: true,
        message:error.message('There was a server error'),
        
      })
    }
  }
};

function forgotPassword(req, res, next) {
  return res.send("Forgot Password Route").status(200);
};

function resetPassword(req, res, next) {
  return res.send("Reset Password Route").status(200);
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
}




