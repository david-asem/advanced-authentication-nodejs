const User = require('../models/Users');

//route functions
async function register(req, res, next) {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username, email, password
    });
    return res.status(200).json({
      message: "registration successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
  
};

async function login(req, res, next) {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({
      success:false,
      message: 'Please provide an email or username and a password',
    })
  } else {
    try {
      const user = await User.findOne({ email }).select('+password');

          if (!user) {
            return res.status(404).json({
              error: true,
              message: (`Invalid credentials`)
            });
          else {
              
            }
      }
    } catch (error) {
      
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




