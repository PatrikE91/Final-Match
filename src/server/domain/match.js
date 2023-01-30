const { PrismaClient } = require("@prisma/client");
const { act } = require("react-dom/test-utils");
const prisma = new PrismaClient();

class Match {
  constructor(userIdA, userIdB) {
    this.userIdA = userIdA;
    this.userIdB = userIdB;
  }

  static async findMatch(userIdA, userIdB) {
    try {
      const matchExists = await prisma.match.findUnique({
        where: {
          matchIdentifier: {
            userIdA: Number(userIdA),
            userIdB: Number(userIdB),
          },
        },
      });
      return matchExists;
    } catch (e) {
      console.error(e);
    }
  }

  static async matchUsers(idA, idB) {
    try {
      const match = await prisma.match.create({
        data: {
          matcher: {
            connect: { 
              id: Number(idA) 
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
    } catch (e) {
      console.error(e);
    }
  }

  static async removeMatch(userId, idToUnmatch) {
    try {
      const removedMatch = await prisma.match.delete({
        where: {
          matchIdentifier: {
            userIdA: Number(userId),
            userIdB: Number(idToUnmatch),
          },
        },
      });
      // const removedMatchSecondUser = await prisma.match.delete({
      //   where: {
      //     matchIdentifier: {
      //       userIdA: Number(idToUnmatch),
      //       userIdB: Number(userId),
      //     },
      //   },
      // });

      return removedMatch;
    } catch (e) {
      console.error(e);
    }
  }

  static async findAllMatches(){
    try {
      const matches = await prisma.match.findMany()
      console.log(matches)
      return matches
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = { Match };
