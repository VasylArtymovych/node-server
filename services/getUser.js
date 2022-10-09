const { User } = require("../models");
const { RequestError } = require("../helpers");

const getUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw RequestError(400, "User not found");
  }
  return user;
};

module.exports = getUser;
