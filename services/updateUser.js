const { User } = require("../models");
const { RequestError } = require("../helpers");

const updateUser = async (id, body) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...body },
    { returnDocument: "after" }
  );

  if (!user) {
    throw RequestError(400, "User not found");
  }

  return user;
};

module.exports = updateUser;
