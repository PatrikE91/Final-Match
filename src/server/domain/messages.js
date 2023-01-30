const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Room } = require("./room");

class Messages {
  constructor(content) {
    this.content = content;
  }

  static async createMessage(userId, roomId, content) {
    try {
      const room = await Room.findRoomById(roomId);
      // console.log("content: ", content);
      console.log("room: ", room);
      console.log("room id: ", roomId);

      const recipientId =
        room.users[0].id === Number(userId)
          ? Number(room.users[1].id)
          : Number(room.users[0].id);


      const message = await prisma.message.create({
        data: {
          content,
          room: {
            connect: { id: Number(roomId) },
          },
          sender: {
            connect: { id: Number(userId) },
          },
          recipient: {
            connect: { id: recipientId },
          },
        },
      });
      console.log("messaage: ", message);

      return message;
    } catch (e) {
      console.error(e);
    }
  }

  static async findMessages() {
    try {
      const messages = await prisma.message.findMany();
      console.log("HERE: ", messages);
      return messages;
    } catch (e) {
      console.error(e);
    }
  }

  static async findMessagesByRoomId(roomId) {
    try {
      const messages = await prisma.message.findMany({
        where: {
          roomId: Number(roomId),
        },
      });
      console.log(messages);
      return messages;
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = { Messages };
