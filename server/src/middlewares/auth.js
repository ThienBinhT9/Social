const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, 'access_key', (err, user) => {
                if(err){
                    return res.status(401).json('Token không hợp lệ');
                }
                else{
                    req.user = user;
                    next();
                }
            })
        }
        else{
            return res.status(403).json('bạn chưa đăng nhập')
        }
        
    } catch (error) {
        return res.status(500).json(error);
    }
}


const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id){
            next();
        }
        else{
            return res.status(500).json('Khong co quyen');
        }
    })
}


module.exports = { verifyToken, verifyTokenAndUserAuthorization };
