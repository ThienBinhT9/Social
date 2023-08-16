const route = require('express').Router();
const messageController = require('../controllers/message');
const { verifyToken } = require('../middlewares/auth');



module.exports = route;
