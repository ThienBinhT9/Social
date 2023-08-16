const Comment = require('../models/comment');
const User = require('../models/user');

class CommentControllers{
    
    //[GET] /comments/:postId
    async getComment(req, res) {
        try {
            const page = req.query.page;
            const skip = (page - 1) * 10;
            const comments = await Comment.find({postId:req.params.postId})
            .limit(10)
            .skip(skip)
            .sort({createdAt:-1})
            
            res.status(200).json(comments);
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //[POST] /comments/:postId/create
    async create(req, res) {
        try {

            const user = await User.findById(req.body.userId);

            //create
            const newComment = await new Comment({
                userId:user._id,
                username:user.username,
                avaUrl:user.avatar,
                postId:req.params.postId,
                content:req.body.content
            });

            //save
            const comment = await newComment.save();
            res.status(200).json(comment);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //[DELETE] comments/:id
    async delete(req, res){
        try {
            const comment = await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json(comment);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //[PUT] comments/:id/update
    async update(req, res) {
        
    }
}


module.exports = new CommentControllers;
