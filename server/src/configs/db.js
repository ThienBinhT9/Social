const mongoose = require('mongoose');

const connect = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/Media');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect to DB failed');
    }
}

module.exports = {connect};


