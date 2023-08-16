const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    userId:String,
    username:String,
    avaUrl:String,
    likes:{
        type:Array,
        default:[]
    },
    saved:{
        type:Array,
        default:[]
    },
},{timestamps:true, collection:'posts'});


module.exports = mongoose.model('posts', PostSchema);
