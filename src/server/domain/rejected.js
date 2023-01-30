const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Reject {
  static async createRejection(idA, idB) {
    try {
        console.log(idA, idB)
      const rejection = await prisma.rejected.create({
        data: {
          rejected: {
            connect: {
              id: Number(idA),
            },
          },
          rejection: {
            connect: {
              id: Number(idB),
            },
          },
        },
      });               
      console.log(rejection)
      return rejection
    } catch (e) {
      console.error(e);
    }
  }

  static async findRejections(){
    try {
      const rej = await prisma.rejected.findMany()
      console.log('rej: ',rej)
      return rej
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = { Reject };

