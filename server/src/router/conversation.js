const route = require('express').Router()
const {verifyToken} = require('../middlewares/auth')
const conversationController = require('../controllers/conversation')

//Create conversation
route.post('/', verifyToken, conversationController.createConversation);

//Get conversation of a user
route.get('/:userId', verifyToken, conversationController.getConversation);

//Get availabel conversation between users
route.get('/find/:first/:second', verifyToken, conversationController.getAvailabelConversation);

module.exports = route;
