const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:true,
        maxLength:50,
    },
    password:{
        type:String,
        minLength:5,
        require:true
    },
    username:{
        type:String,
        require:true,
        minLength:1,
        maxLength:50
    },
    displayName:{
        type:String,
        default:'New user'
    },
    about:{
        type:String,
        default:'Xin chào!'
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:'https://i.pinimg.com/564x/49/ce/d2/49ced2e29b6d4945a13be722bac54642.jpg'
    },
    coverImage:{
        type:String,
        default:'https://i.pinimg.com/564x/3a/b7/ea/3ab7eac12701d0ca0e2ed6f668b70987.jpg'
    },
    theme:{
        type:String,
        default:'#ff9051'
    },
    karmas: {
        type: Number,
        default: 0,
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    friends:{
        type:Array,
        default:[]
    },
    favorites: {
        type: Array,
        default: [],
    },
    birth:{
        type:String,
        default:""
    }
},{timestamps:true, collection:'users'});


module.exports = mongoose.model('users', UserSchema);
