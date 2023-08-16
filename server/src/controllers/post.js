const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');


class PostControllers{
    
    //[POST] /posts/:userId/create
    async create(req, res) {
        try {
            const user = await User.findById(req.params.userId);
                
                const fileData = req.file;

                if(fileData){

                        //create
                        const newPost = await new Post({
                            title:req.body.title,
                            image:fileData.path,
                            userId:user._id,
                            username:user.username,
                            avaUrl:user.avatar,
                        });
            
                        //save
                        const post = await newPost.save();
                        res.status(200).json(post);
                }else{

                    //create
                    const newPost = await new Post({
                        title:req.body.title,
                        userId:user._id,
                        username:user.username,
                        avaUrl:user.avatar,
                    });
        
                    //save
                    const post = await newPost.save();
                    res.status(200).json(post);
                }
                
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //[GET] /posts
    async getAllPost(req, res) {
        try {
            const page = req.query.page;
            const skip = (page - 1) * 8;
            const posts = await Post.find({})
            .limit(8)
            .skip(skip)
            .sort({createdAt:-1});
            res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //[GET] /posts/:userId
    async getMyPost(req, res) {
        try {
            const currentPage = req.query.page;
            const skip = (currentPage - 1) * 4;
            const posts = await Post.find({userId:req.params.userId})
            .skip(skip)
            .limit(4)
            .sort({createdAt:-1})

            res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    //[GET] /posts/saved/:userId
    async getMyPostSaved(req, res) {
        try {
            const currentPage = req.query.page;
            const skip = (currentPage - 1) * 4;
            const posts = await Post.find({
                saved:{ $elemMatch: { $eq: req.params.userId } }
            })
            .skip(skip)
            .limit(4)
            .sort({createdAt:-1})

            res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    //[PUT] /posts/:id/like
    async likePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);

            if(!post.likes.includes(req.body.userId)){
                const postAfterUpdate = await Post.findByIdAndUpdate(req.params.id, 
                    {
                        $push: {likes: req.body.userId}
                    },
                    {returnDocument:"after"}
                )

                res.status(200).json(postAfterUpdate)
            }else{
                const postAfterUpdate = await Post.findByIdAndUpdate(req.params.id, 
                    {
                        $pull: {likes: req.body.userId}
                    },
                    {returnDocument:"after"}
                )

                res.status(200).json(postAfterUpdate)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //[PUT] /posts/:id/saved
    async savePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);

            if(!post.saved.includes(req.body.userId)){
                const postAfterUpdate = await Post.findByIdAndUpdate(req.params.id, 
                    {
                        $push: {saved: req.body.userId}
                    },
                    {returnDocument:"after"}
                )

                res.status(200).json(postAfterUpdate)
            }else{
                const postAfterUpdate = await Post.findByIdAndUpdate(req.params.id, 
                    {
                        $pull: {saved: req.body.userId}
                    },
                    {returnDocument:"after"}
                )

                res.status(200).json(postAfterUpdate)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //[PUT] /posts/:id
    async update(req, res) {
        
    }

    //[DELETE] /posts/:id/delete
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({postId: req.params.id});
            res.status(200).json(post);
        } catch (error) {
            return res.status(500).json('Delete Failed');
        }
    }
}


module.exports = new PostControllers;
