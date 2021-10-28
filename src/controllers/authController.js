const User = require('../models/Users');
const ErrorHandlers = require('../services/errorHandlers');
//route functions
async function register(req, res, next) {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username, email, password,
    });
    return sendToken(user, 201, res)

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
            return next(new ErrorHandlers('Invalid credentials', 401));
          }
      else {
            const isMatch = await user.matchPasswords(password);
            if (!isMatch) {
              return next(new ErrorHandlers('Invalid credentials', 401));
            }     else {
                  return sendToken(user, 200, res)
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

//forgot password function
async function forgotPassword(req, res, next) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandlers('Email could not be sent', 404));
    }

    else {
      const resetToken = user.getResetPasswordToken();

      await user.save();
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

      const message =
        `<h1> You have requested a password reset</h1>
        <p>Please go to this link to reset yout password </p>
        <a href =${resetUrl} clicktracking=off>${resetUrl}</a>
        `
    }
    try {
      
    } catch (error) {
      
    }
  } catch (error) {
    
  }
};

function resetPassword(req, res, next) {
  return res.send("Reset Password Route").status(200);
};

const sendToken = async (user, statusCode, res) => {
  const token = await user.getSignedToken();
  return res.status(statusCode).json({
    success: true,
    token,
  })
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
}




