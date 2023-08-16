const route = require('express').Router();
const authControllers = require('../controllers/auth');
const { verifyToken } = require('../middlewares/auth');

route.post('/register', authControllers.resgister);
route.post('/login', authControllers.login);
route.post('/logout', verifyToken, authControllers.logout);
route.post('/refresh', authControllers.refreshToken);

module.exports = route;
