const User = require('../models/Users');

//route functions
async function register(req, res, next) {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username, email, password
    });
    return res.status(200).json({
      success: "registration successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
  
};

function login(req, res, next) {
  return res.send("Login Route").status(200);
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




