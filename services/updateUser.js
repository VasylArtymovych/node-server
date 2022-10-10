const { User } = require("../models");
const { RequestError } = require("../helpers");

const updateUser = async (id, body) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...body },
    { returnDocument: "after" }
  ).select({
    password: 0,
    createdAt: 0,
    updatedAt: 0,
  });

  if (!user) {
    throw RequestError(400, "User not found");
  }
  return user;
};

module.exports = updateUser;
