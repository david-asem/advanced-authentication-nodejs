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

function forgotPassword(req, res, next) {
  return res.send("Forgot Password Route").status(200);
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




