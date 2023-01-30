const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const bcrypt = require("bcrypt");

async function seed() {
  const users = await createUser();
  await createProfile(users);
  // await createRejection(users);
  // await createMatch(users);
  // await createInterest(users);
}
// const passwordHash = await bcrypt.hash('123', 8)
const userCreationData = [
  {
    username: "Nathan",
    email: "maria@k.com",
    password: "1234",
  },
  {
    username: "Jotaro",
    email: "mariaq@k.com",
    password: "1234",
  },
  {
    username: "Gerald",
    email: "pattor@k.com",
    password: "1234",
  },
  // {
  //   username: "Lara",
  //   email: "davwid@k.com",
  //   password: "1234",
  // },
  // {
  //   username: "Joseph",
  //   email: "mariar@k.com",
  //   password: "1234",
  // },
  // {
  //   username: "Pucci",
  //   email: "marvcia@k.com",
  //   password: "1234",
  // },
];
async function createUser() {
  return await prisma.$transaction(
    userCreationData.map((user) => {
      return prisma.user.create({
        data: user,
        include: {
          profile: true,
        },
      });
    })
  );
}

function profiles(users) {
  return [
    {
      firstName: "James",
      lastName: "Gun",
      age: "31",
      pictureId:
        "https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNjEyMzIwNi9vcmlnaW4ucG5nIiwiZXhwaXJlc19hdCI6MTcxNjg1MjgxNX0.arl8y_2vfBGqNS8oK_vi-0X6dB6wGWAGAqajnyrBsXE/img.png?width=980",
      user: {
        connect: {
          id: users[0].id,
        },
      },
    },
    {
      firstName: "Persus",
      lastName: "Bulma",
      age: "29",
      pictureId:
        "https://thicc.mywaifulist.moe/waifus/561/b5a296f0431715f6d6829cfac60f42e73124342a04118b5c5df695923bcb2429_thumb.png",
      user: {
        connect: {
          id: users[1].id,
        },
      },
    },
    {
      firstName: "Gerald",
      lastName: "Cristo",
      age: "71",
      pictureId:
        "https://s5.cdn.memeburn.com/wp-content/uploads/2022/11/The-Witcher.jpg",
      user: {
        connect: {
          id: users[2].id,
        },
      },
    },
    // {
    //   firstName: "Jolyne",
    //   lastName: "Cristo",
    //   age: "28",
    //   pictureId:
    //     "https://qph.cf2.quoracdn.net/main-qimg-d2af58f354f8a269d4e19444318e7b96-lq",
    //   user: {
    //     connect: {
    //       id: users[3].id,
    //     },
    //   },
    // },
    // {
    //   firstName: "Joseph",
    //   lastName: "Jostar",
    //   age: "48",
    //   pictureId:
    //     "https://i.ytimg.com/vi/P-3GOo_nWoc/maxresdefault.jpg",
    //   user: {
    //     connect: {
    //       id: users[4].id,
    //     },
    //   },
    // },
    // {
    //   firstName: "Pucci",
    //   lastName: "Jostar",
    //   age: "18",
    //   pictureId:
    //     "https://i1.sndcdn.com/artworks-x6IC15HLB4q5K03h-P3tCww-t500x500.jpg",
    //   user: {
    //     connect: {
    //       id: users[5].id,
    //     },
    //   },
    // },
  ];
}

// function interests(users) {
//   return [
//     {
//       favoriteGame: "Final Fantasy X",
//       favoriteBook: "The Hitchhiker's Guide to the Galaxy",
//       favoriteMovie: "the fifth element",
//       user: {
//         connect: {
//           id: users[0].id,
//         },
//       },
//     },
//     {
//       favoriteGame: "RDD 2",
//       favoriteBook: "it",
//       favoriteMovie: "it",
//       user: {
//         connect: {
//           id: users[1].id,
//         },
//       },
//     },
//     {
//       favoriteGame: "Final Fantasy 15",
//       favoriteBook: "dorian",
//       favoriteMovie: "die hard",
//       user: {
//         connect: {
//           id: users[2].id,
//         },
//       },
//     },
//     {
//       favoriteGame: "Final Fantasy 15",
//       favoriteBook: "dorian",
//       favoriteMovie: "die hard",
//       user: {
//         connect: {
//           id: users[3].id,
//         },
//       },
//     },
//     // {
//     //   favoriteGame: "Final Fantasy 15",
//     //   favoriteBook: "dorian",
//     //   favoriteMovie: "die hard",
//     //   user: {
//     //     connect: {
//     //       id: users[4].id,
//     //     },
//     //   },
//     // },
//     // {
//     //   favoriteGame: "Final Fantasy 7",
//     //   favoriteBook: "it",
//     //   favoriteMovie: "scarry movie",
//     // user: {
//     //   connect: {
//     //     id: users[5].id,
//     //   },
//     // },
//     // },
//   ];
// }

async function createProfile(users) {
  const profileData = profiles(users);

  return await prisma.$transaction(
    profileData.map((profile) => {
      return prisma.profile.create({
        data: profile,
      });
    })
  );
}

// async function createInterest(users) {
//   const interestData = interests(users);

//   return await prisma.$transaction(
//     interestData.map((interest) => {
//       return prisma.interests.create({
//         data: interest,
//       });
//     })
//   );
// }

async function createRejection(users) {
  const rejection = await prisma.rejected.create({
    data: {
      rejected: {
        connect: {
          id: users[0].id,
        },
      },
      rejection: {
        connect: {
          id: users[2].id,
        },
      },
    },
  });
  return rejection;
}

async function createMatch(users) {
  const match = await prisma.match.create({
    data: {
      matcher: {
        connect: {
          id: users[0].id,
        },
      },
      matchee: {
        connect: {
          id: users[1].id,
        },
      },
    },
  });

  return match;
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
