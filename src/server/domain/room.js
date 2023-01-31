const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Room {
  static async createRoom(userIdA, userIdB) {
    const room = await prisma.room.create({
      data: {
        userA: Number(userIdA),
        userB: Number(userIdB),
      },
    });

    return room;
  }

  static async assignRoom(roomToUpdate, userOneId, userTwoId) {
    const users = [userOneId, userTwoId];
    let updatedRoom = [];
    for (let i = 0; i < 2; i++) {
      const room = await prisma.room.update({
        where: {
          id: roomToUpdate.id,
        },
        data: {
          users: {
            connect: {
              id: Number(users[i]),
            },
          },
          userA: i === 0 ? Number(userOneId) : false,
          userB: i === 0 ? Number(userTwoId) : false,
        },
      });
      updatedRoom.push(room);
    }
    return updatedRoom;
  }

  static async findRoomById(id) {
    const room = await prisma.room.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        users: true,
      },
    });
    return room;
  }

  static async findRoomByUserId(userId) {
    const rooms = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        rooms: true,
      },
    });

    return rooms.rooms;
  }

  static async deleteRoom(id) {
    const room = await prisma.room.delete({
      where: {
        id: Number(id),
      },
    });
    return room;
  }
}

module.exports = { Room };
