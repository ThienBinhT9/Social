const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId:String,
    postId:String,
    username:String,
    avaUrl:String,
    content:{
        type:String,
        require:true
    },
    likes:{
        type:Array,
        default:[]
    }

},{timestamps:true, collection:'comments'});

module.exports = mongoose.model('comments', CommentSchema);
