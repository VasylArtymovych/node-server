const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { User } = require("./models");
const { usersRouter } = require("./routes");
const { hlps } = require("./helpers");

const { MONGO_DB_URI, DB_NAME } = process.env;
const PORT = process.env.PORT || 3000;

const app = express();
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} just connected!`);

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", usersRouter);

app.use(hlps.unknownRouteHandler);
app.use(hlps.errorHandler);

mongoose.connect(MONGO_DB_URI, { dbName: DB_NAME });

http.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`server runs on port ${PORT}!`);
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connected");

  const usersChangeWatch = User.watch();

  usersChangeWatch.on("change", (change) => {
    switch (change.operationType) {
      case "update":
        socketIO.emit("sendNotify", {
          msg: `User details updated`,
        });
        break;
      case "insert":
        socketIO.emit("sendNotify", {
          msg: `User Created`,
        });
        break;
    }
  });
});
