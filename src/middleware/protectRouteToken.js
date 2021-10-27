const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const ErrorHandlers=require('../services/errorHandlers')

async function protectRouteToken(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorHandlers('Not authenticated to access this route', 401));
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id)
        
      if (!user) {
        return next(new ErrorHandlers('No user was found with this id', 404))
      }

      req.user = user;

      next();
    } catch (error) {
      return next(new ErrorHandlers('Not authorized to access this route'));
    }
  }
}

module.exports = protectRouteToken;