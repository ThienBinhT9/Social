const route = require('express').Router();
const commentControllers = require('../controllers/comment');
const { verifyToken } = require('../middlewares/auth')


//CREATE A COMMENT
route.post('/:postId/create', verifyToken, commentControllers.create);

//GET COMMENT
route.get('/:postId', verifyToken, commentControllers.getComment);

module.exports = route;
