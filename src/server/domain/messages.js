const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Room } = require("./room");

class Messages {
  constructor(content) {
    this.content = content;
  }

  static async createMessage(userId, roomId, content) {
    const room = await Room.findRoomById(roomId);

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

    return message;
  }

  static async findMessages() {
    const messages = await prisma.message.findMany();
    return messages;
  }

  static async findMessagesByRoomId(roomId) {
    const messages = await prisma.message.findMany({
      where: {
        roomId: Number(roomId),
      },
    });
    return messages;
  }
}

module.exports = { Messages };
