const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { cloudinary } = require('./cloudinary')

const UploadPost = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'jpeg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    },
    params: {
        folder: 'post_picture'
    }
})

const UploadUser = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'jpeg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    },
    params: {
        folder: 'user_picture'
    }
})

const PostCloud = multer({storage:UploadPost})
const UserCloud = multer({storage:UploadUser})

module.exports = { PostCloud, UserCloud }