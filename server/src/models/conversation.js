const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ConversationSchema = new Schema({
    members:{
        type:Array,
        default:[]
    },
    messageCount:{
        type:Number,
        default:0
    }
},{
    timestamps:true,
    collection:'conversations'
})

module.exports = mongoose.model('conversations', ConversationSchema);
