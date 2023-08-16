const authRouter = require('./auth');
const userRouter = require('./user');
const postRouter = require('./post')
const commentRouter = require('./comment');
const conversationRouter = require('./conversation');
const messageRouter = require('./message');

const router = (app) => {

    app.use('/auth', authRouter);

    app.use('/posts', postRouter);

    app.use('/comments', commentRouter);

    app.use('/conversation', conversationRouter);

    app.use('/messages', messageRouter);

    app.use('/users', userRouter);
}

module.exports = router;
