const User = require('../models/Users');

//route functions
async function register(req, res, next) {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username, email, password
    });
    return res.status(201).json({
      success: true,
      message:'registration successful',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
  
};

//login function
async function login(req, res, next) {
  const { email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error:true,
      message: 'Please provide an email and a password',
    })
  } else {
    try {
      const user = await User.findOne({ email }).select('+password');

          if (!user) {
            return res.status(404).json({
              error: true,
              message: (`Invalid credentials`)
            });
          }
      else {
            const isMatch = await user.matchPasswords(password);
            if (!isMatch) {
              return res.status(404).json({
                error: true,
                message:'Invalid credentials'
              })
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




