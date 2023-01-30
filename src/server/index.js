const express = require("express");
require("express-async-errors");
require("dotenv").config();
// const bodyParser = require('body-parser') 
const { Prisma } = require("@prisma/client");

const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("images"));

// app.use(serveStatic('public', { index: ['default.html', 'default.html'] }))
// app.use("/users/register",upload.single('image'), userRouter);
// app.use('/static', serveStatic('images'))

const userRouter = require("./routers/users");
const matchRouter = require("./routers/match");
const messagesRouter = require('./routers/messages')
const roomRouter = require('./routers/room')
const rejectedRouter = require('./routers/rejected')

app.use("/users", userRouter);
app.use('/match', matchRouter)
app.use('/messages', messagesRouter)
app.use('/rooms', roomRouter)
app.use('/rejected', rejectedRouter)
app.use("/images", express.static("images"));

app.use((e, req, res, next) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return res
        .status(409)
        .json({ error: "A user with the provided detail already exists" });
    }
    if (e.code === "P2013") {
      return res.status(400).json({ error: "Missing fields in request body" });
    }
    if (e.code === "P2001") {
      return res.status(404).json({ error: "That resource does not exist" });
    }
    if (e.code === "P2016") {
      return res.status(404).json({ error: "That resource does not exist" });
    }
    if (e.code === "P2025") {
      return res.status(409).json({ error: "That resource does not exist" });
    }
  }
  console.log(e);
  res.status(500).json({ error: "Oooooops" });
});

const port = process.env.SERVER_PORT || 4000;

app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});
