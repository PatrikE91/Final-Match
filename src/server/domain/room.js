const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Room {
  static async createRoom(userIdA, userIdB) {
    try {
      const room = await prisma.room.create({
        data: {
          userA: Number(userIdA),
          userB: Number(userIdB),
        },
      });

      return room;
    } catch (e) {
      console.error(e);
    }
  }

  static async assignRoom(roomToUpdate, userOneId, userTwoId) {
    try {
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
            userA: i === 0 ? Number(userOneId) : console.log("Hi from room"),
            userB: i === 0 ? Number(userTwoId) : console.log("Hi from room"),
          },
        });
        updatedRoom.push(room);
      }
      return updatedRoom;
    } catch (e) {
      console.error(e);
    }
  }

  static async findRoomById(id){
    try {
      const room = await prisma.room.findUnique({
        where:{
          id: Number(id)
        },
        include:{
          users: true
        }
      })
      return room
    } catch (e) {
      console.error(e)
    }
  }

  static async findRoomByUserId(userId) {
    try {
      const rooms = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
        include: {
          rooms: true,
        },
      });
  
      return rooms.rooms;
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteRoom(id){
    try {
      console.log(id)
      const room = await prisma.room.delete({
        where:{
          id: Number(id)
        }
      })
      console.log(room)
      return room
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = { Room };
