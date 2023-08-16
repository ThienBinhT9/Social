const route = require('express').Router();
const postControllers = require('../controllers/post');
const { verifyToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/post');
const { PostCloud } = require('../utils/multer');

//Create a post
route.post('/:userId/create', isAdmin, PostCloud.single("image"), postControllers.create);

//Get all post
route.get('/', verifyToken, postControllers.getAllPost);

//Get my post
route.get('/:userId', verifyToken, postControllers.getMyPost);

//Get my post saved
route.get('/saved/:userId', isAdmin, postControllers.getMyPostSaved);

//Like post
route.put('/:id/like', verifyToken, postControllers.likePost);

//save post
route.put('/:id/save', verifyToken, postControllers.savePost);

//update post
route.put('/:id', isAdmin, postControllers.update);

//delete post
route.delete('/:id/:userId/delete', isAdmin, postControllers.delete);


module.exports = route;
