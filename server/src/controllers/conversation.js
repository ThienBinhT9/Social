const Conversation = require('../models/conversation');

class ConversationController{

    //[POST] /conversation/
    async createConversation(req, res) {
        const newConversation = new Conversation({
            members:[req.body.senderId, req.body.receiverId]
        })

        try {
            const savedConversation = newConversation.save();
            res.status(200).json(savedConversation);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //[GET] /conversation/:userId
    async getConversation(req, res) {
        try {
            const conversation = await Conversation.find({
                members:{ $in:[req.params.userId]}
            });
            res.status(200).json(conversation);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //[GET] /conversation/find/:first/:second
    async getAvailabelConversation(req, res) {
        try {
            const conversation = await Conversation.findOne({
                members:{$all:[req.params.first, req.params.second]}
            })
            res.status(200).json(conversation)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new ConversationController;
