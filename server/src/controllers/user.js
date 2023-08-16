const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const bcrpyt = require('bcrypt');


class UserControllers{
    
    //[GET] /users/:id
    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            res.status(200).json(user);
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //[PUT] /users/:id
    async updateUser(req, res) {
        //update passwrod
        if(req.body.password){
            try {
                const salt = await bcrpyt.genSalt(10);
                req.body.password = await bcrpyt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        
        try {
            const fileData = req.files;
            let dataForm

            if(fileData.avatar && fileData.coverImage){
                dataForm = {...req.body, avatar:fileData.avatar[0].path, coverImage:fileData.coverImage[0].path};
            }else if(fileData.avatar){
                dataForm = {...req.body, avatar:fileData.avatar[0].path};
            }else if(fileData.coverImage){
                dataForm = {...req.body, coverImage:fileData.coverImage[0].path};
            }else{
                dataForm = req.body;
            }

            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    $set:dataForm
                },
                {returnDocument:"after"}
            );

            if(fileData.avatar || req.body.username){
                try {
                    await Post.updateMany({userId: req.params.id},
                        {
                            $set: {avaUrl: fileData.avatar[0].path, username: req.body.username}
                        }
                    );

                    await Comment.updateMany({userId: req.params.id}, 
                        {
                            $set: {avaUrl: fileData.avatar[0].path, username: req.body.username}
                        }
                    )
                    
                } catch (error) {
                    return res.status(500).json(error);
                }
            }

            res.status(200).json(user);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //[PUT] /users/:id/follow
    async followUser(req, res) {
        if(req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);

                //Nếu Người dùng chưa follow
                if(!user.followers.includes(req.body.userId)){

                    //cập nhập filed followers cho đối tượng mà người dùng muốn theo dõi
                    const updatePerson = await User.findByIdAndUpdate(req.params.id, 
                        {
                            $push:{ followers: req.body.userId}
                        },
                        {returnDocument: "after"}
                    );

                    //cập nhập người dùng đang theo dõi đối tượng
                    const updateUser = await User.findByIdAndUpdate(req.body.userId, 
                        {
                            $push:{ followings: req.params.id}
                        },
                        {returnDocument: "after"}
                    );
                    

                    return res.status(200).json({updatePerson, updateUser})
                }else{
                    const updatePerson = await User.findByIdAndUpdate(req.params.id,
                        {
                            $pull:{followers: req.body.userId}
                        },
                        {returnDocument:"after"}
                    );

                    const updateUser = await User.findByIdAndUpdate(req.body.userId, 
                        {
                            $pull:{followings: req.params.id}
                        },
                        {returnDocument:"after"}
                    );

                    return res.status(200).json({updatePerson, updateUser});
                }

            } catch (error) {
                return res.status(500).json(error);
            }
        }else{
            return res.status(500).json("You can't follow yourself");
        }
    }

    //[PUT] /users/:id/accept
    async acceptFriend(req, res) {
        try {
            const user = await User.findById(req.params.id)
            if(!user.friends.includes(req.body.userId)){

                const userAfterUpdate = await User.findByIdAndUpdate(req.params.id,
                    {
                        $push:{friends: req.body.userId},
                        $pull:{followers: req.body.userId}
                    },
                    {returnDocument:'after'}
                )

                await User.findByIdAndUpdate(req.body.userId,
                    {
                        $push:{friends: req.params.id},
                        $pull:{followings: req.params.id}
                    }
                )
    
                res.status(200).json(userAfterUpdate)
            }


        } catch (error) {
            return res.status(500).json(error)
        }
    }

    //[PUT] /users/:id/ignore
    async ignoreFriend(req, res) {
        try {
            const user = await User.findById(req.params.id)
            if(user.friends.includes(req.body.userId)){

                const userAfterUpdate = await User.findByIdAndUpdate(req.params.id,
                    {
                        $pull:{followers: req.body.userId, friends: req.body.userId}
                    },
                    {returnDocument:'after'}
                )

                await User.findByIdAndUpdate(req.body.userId,
                    {
                        $pull:{followers: req.params.id, friends: req.params.id}
                    }
                )
    
                res.status(200).json(userAfterUpdate)
            }


        } catch (error) {
            return res.status(500).json(error)
        }
    }


    //[GET] /users/:id/friend
    async getFriendUser(req, res) {
        try {
            const skip = (req.query.page - 1) * 10
            const user = await User.findById(req.params.id)
            const users = await User.find({
                _id:{ $in: user.friends}
            })
            .limit(10)
            .skip(skip)
            .select("username avatar _id")

            res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    //[GET] /users/:id/follower
    async getFollowerUser(req, res) {
        try {
            const user = await User.findById(req.params.id)

            const skip = (req.query.page - 1) * 10
            const users = await User.find({
                _id:{ $in: user.followers}
            })
            .limit(10)
            .skip(skip)
            .select("username avatar _id")

            res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    //[GET] /users/:id/following
    async getFollowingUser(req, res) {
        try {
            const user = await User.findById(req.params.id)

            const skip = (req.query.page - 1) * 10
            const users = await User.find({
                _id:{ $in: user.followings}
            })
            .limit(10)
            .skip(skip)
            .select("username avatar _id")

            res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    

    //[GET] /users?username
    async searchUser(req, res) {
        try {
            const username = req.query.username;
            const usernameRegex = new RegExp(username, 'i');

            const users = await User.find({username: {$regex: usernameRegex}})
            .limit(10)
            .select("username avatar _id")

            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getLeaderBoard(req, res) {
        try {
            const users = await User.find().sort({ karmas: -1 }).limit(10);
            res.status(200).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = new UserControllers;
