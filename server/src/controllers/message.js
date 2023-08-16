const Message = require('../models/message');
const Conversation = require('../models/conversation');

class MessageController {
    
    async createMessage(req, res) {
        try {
            const newMes = new Message(req.body);
            
            const savedMsg = newMes.save();
            await Conversation.findByIdAndUpdate({
                _id:req.body.conversationId
            },
            {
                $inc:{messageCount: 1}
            });
            res.status(200).json(savedMsg);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getMessage (req, res) {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId
            })
            res.status(200).json(messages)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new MessageController;
