// const { prisma } = require("@prisma/client");
const { Match } = require("../domain/match");
const { Messages } = require("../domain/messages");

const createMessage = async (req, res) => {
  const { userId, roomId } = req.params;
  const { content } = req.body;
  console.log("BODY REQ:", req.body);
  try {
    if (!content) {
      return res.status(400).json({ message: "Scrivi qualcosa" });
    }
    const message = await Messages.createMessage(userId, roomId, content);
    console.log(message);
    if (!message) {
      return res.status(400).json({ message: "Unable to create the message" });
    }
    return res.status(201).json({ message: message });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to send the message" });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Messages.findMessages();
    return res.status(201).json({ messages: messages });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to send the message" });
  }
};

const getMessagesByRoomId = async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Messages.findMessagesByRoomId(roomId);
    return res.status(201).json({ messages: messages });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to send the message" });
  }
};



module.exports = {
  createMessage,
  getMessages,
  getMessagesByRoomId,

};
