const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const refreshTokens = []
class AuthControllers{

    async resgister(req, res) {
        if(req.body.password.length > 5){
            try {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);

                //Create new user
                const newUser = await new User({
                    email:req.body.email,
                    username:req.body.username,
                    password:hashed
                })

                //Save to DB
                const user = await newUser.save();
                res.status(200).json(user);
            
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        else{
            return res.status(401).json('Mật khẩu phải nhiều hơn 5 kí tự');
        }
    }


    async login(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json('Tài khoản không tồn tại');
            }

            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if(!passwordCompare) {
                return res.status(401).json('Mật khẩu không hợp lệ!');
            }

            if(passwordCompare && user){
                const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, 'access_key', {expiresIn:'2h'});
                const refreshToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, 'refresh_key', {expiresIn:'365d'});
                refreshTokens.push(refreshToken)
                res.cookie('refreshToken', refreshToken);

                const {password, ...others} = user._doc;

                const returnUser = {
                    ...others,
                    accessToken
                }

                res.status(200).json(returnUser);
            }
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async logout(req, res) {
        res.clearCookie('refreshToken');
        res.status(200).json('Logout successfully');
    }

    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken){
                return res.status(401).json('Bạn chưa đăng nhập01');
            }
            
            if(!refreshTokens.includes(refreshToken)) {
                return res.status(401).json('Bạn chưa đăng nhập02')
            }
            jwt.verify(refreshToken, 'refresh_key', (err, user) => {
                if(err){
                    return res.status(401).json('Token không hợp lệ');
                }
                else{

                    refreshTokens.pop()

                    const newAccessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, 'access_key', {expiresIn:'2h'});
                    const newRefreshToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, 'refresh_key', {expiresIn:'365d'});
                    refreshTokens.push(newRefreshToken)
                    res.cookie('refreshToken', newRefreshToken);

                    res.status(200).json(newAccessToken);
                }
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new AuthControllers;
