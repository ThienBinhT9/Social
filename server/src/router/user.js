const router = require('express').Router();
const UserControllers = require('../controllers/user');
const {verifyTokenAndUserAuthorization, verifyToken} = require('../middlewares/auth');
const { UserCloud } = require('../utils/multer')

//GET FRIEND USER
router.get('/:id/friends', verifyToken, UserControllers.getFriendUser)

//GET Follower USER
router.get('/:id/follower', verifyToken, UserControllers.getFollowerUser)

//GET Following USER
router.get('/:id/followings', verifyToken, UserControllers.getFollowingUser)

//GET A USER
router.get('/:id', verifyToken, UserControllers.getUser);

//SEARCH USER
router.get('/', verifyToken, UserControllers.searchUser);

//GET LEADER USER BOARD
router.get('/:id/leaderboard', verifyToken, UserControllers.getLeaderBoard);

//UPDATE USER
router.put('/:id', verifyTokenAndUserAuthorization, UserCloud.fields([
    {name:'avatar', maxCount:1},
    {name:'coverImage', maxCount:1}
]),UserControllers.updateUser);

//Accept Friend
router.put('/:id/accept', verifyTokenAndUserAuthorization, UserControllers.acceptFriend);

//Accept Friend
router.put('/:id/ignore', verifyTokenAndUserAuthorization, UserControllers.ignoreFriend);

//FOLLOW A USER
router.put('/:id/follow', verifyToken, UserControllers.followUser);

module.exports = router;
