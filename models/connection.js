const mongoose = require("mongoose");

const { MONGO_DB_URI, DB_NAME } = process.env;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, { dbName: DB_NAME });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectMongoDB;
