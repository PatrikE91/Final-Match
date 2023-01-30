const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const prisma = require("./utils/prisma.js");

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.get("authorization");
    // the '_' means that you don't care/don't wanna use that value 
    // in this case 'Bearer '
    const [_, token] = authHeader.split(" ");

    const payload = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    delete user.password;

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = validateToken;
