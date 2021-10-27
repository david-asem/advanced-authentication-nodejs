const express = require('express');
const privateRouter = express.Router();
const getPrivateData  = require('../controllers/privateData');
const protectRouteToken  = require('../middleware/protectRouteToken');


privateRouter.get('/', protectRouteToken, getPrivateData);

module.exports = privateRouter;