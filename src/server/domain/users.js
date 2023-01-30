const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mySecret = process.env.JWT_SECRET;

export default class User {
    constructor(id, username, password, email, firstName, lastName, age, pictureId){
        this.id = id
        this.username = username
        this.password = password
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.pictureId = pictureId
    }

    static async fromJson(json) {
        const {
          firstName,
          lastName,
          cohortId,
          email,
          biography,
          githubUrl,
          password
        } = json
    
        const passwordHash = await bcrypt.hash(password, 8)
    
        return new User(
          null,
          cohortId,
          firstName,
          lastName,
          email,
          biography,
          githubUrl,
          passwordHash
        )
      }

}