const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { connectMongoDB } = require("./models");
const { usersRouter } = require("./routes");
const { hlps } = require("./helpers");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", usersRouter);

app.post("/test", (req, res) => {
  res.json({ msg: "test" });
});

app.use(hlps.unknownRouteHandler);
app.use(hlps.errorHandler);

const main = async () => {
  await connectMongoDB();
  console.log("MongoDB connected!");

  app.listen(PORT, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(`server runs on port ${PORT}!`);
  });
};

main().catch((error) => console.log(error.message));
