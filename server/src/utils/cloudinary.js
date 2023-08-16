const dotenv = require('dotenv');
dotenv.config();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name:'dfuaryi3x',
    api_key:'331627331374954',
    api_secret:'c1iWA8VqCJXuarl7sG5gYhWgpC4'
})

module.exports = { cloudinary };
