const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Reject {
  static async createRejection(idA, idB) {
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
    return rejection;
  }

  static async findRejections() {
    const rej = await prisma.rejected.findMany();
    return rej;
  }
}

module.exports = { Reject };
