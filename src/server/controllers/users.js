// import User from "../domain/users.js";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mySecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, password, email, firstName, lastName, age, pictureId } =
    req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (findUser !== null) {
    console.log("esiste gia:", findUser);
    return res.status(418).json({
      error: "That username is taken already",
    });
  }
  const hash = await bcrypt.hash(password, 10);
  console.log("hash: ", hash);

  const createdUser = await prisma.user.create({
    data: {
      username,
      password: hash,
      email,
      profile: {
        create: {
          firstName,
          lastName,
          age,
          pictureId,
        },
      },
    },
    include: {
      profile: true,
      interests: true,
    },
  });
  console.log("createdUser request:", createdUser);

  delete createdUser.password;

  return res.status(201).json({ data: createdUser });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!findUser) {
    return res
      .status(401)
      .json({ status: "failed", error: "User doesn't exist." });
  }

  const passwordsMatch = await bcrypt.compare(password, findUser.password);

  if (!passwordsMatch) {
    return res.status(404).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ username, id: findUser.id }, mySecret);
  return res.status(201).json({ data: token, userId: findUser.id });
};

const getUser = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      rooms: true,
      interests: true,
    },
  });

  res.json({ users: users });
};
const getUsersById = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      profile: true,
    },
  });
  return res.json({ user: user });
};
module.exports = {
  register,
  login,
  getUser,
  getUsersById,
};
