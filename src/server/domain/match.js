const { PrismaClient } = require("@prisma/client");
const { act } = require("react-dom/test-utils");
const prisma = new PrismaClient();

class Match {
  constructor(userIdA, userIdB) {
    this.userIdA = userIdA;
    this.userIdB = userIdB;
  }

  static async findMatch(userIdA, userIdB) {
    const matchExists = await prisma.match.findUnique({
      where: {
        matchIdentifier: {
          userIdA: Number(userIdA),
          userIdB: Number(userIdB),
        },
      },
    });
    return matchExists;
  }

  static async matchUsers(idA, idB) {
    const match = await prisma.match.create({
      data: {
        matcher: {
          connect: {
            id: Number(idA),
          },
        },
        matchee: {
          connect: {
            id: Number(idB),
          },
        },
      },
    });
    return match;
  }

  static async removeMatch(userId, idToUnmatch) {
    const removedMatch = await prisma.match.delete({
      where: {
        matchIdentifier: {
          userIdA: Number(userId),
          userIdB: Number(idToUnmatch),
        },
      },
    });

    return removedMatch;
  }

  static async findAllMatches() {
    const matches = await prisma.match.findMany();
    return matches;
  }
}

module.exports = { Match };
