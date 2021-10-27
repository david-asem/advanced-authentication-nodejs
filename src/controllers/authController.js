//route functions

function register(req, res, next) {
  return res.send('Register route').status(200);
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




