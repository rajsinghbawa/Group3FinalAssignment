const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  try {
    const message = new Message({
      sender: req.user.id,
      receiver: req.body.receiver,
      content: req.body.content
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

const getConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    }).sort('createdAt');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

const getInbox = async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.id }).populate('sender', 'name email');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inbox' });
  }
};

module.exports = { sendMessage, getConversation, getInbox };
