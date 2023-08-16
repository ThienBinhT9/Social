const { verifyToken } = require('./auth')

const isAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.userId){
            next();
        }
        else{
            return res.status(500).json('Khong co quyen');
        }
    })
}

module.exports = {isAdmin};
