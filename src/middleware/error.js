const ErrorHandlers = require('../services/errorHandlers');

const errorHandler = (err,req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000) {
    const message = `User already exists`;
    error = new ErrorHandlers(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandlers(message, 400);
  }

  return res.status(error.statusCode || 500).json({
    error: true,
    message: error.message||'Server Error',
  })
}

module.exports = errorHandler;