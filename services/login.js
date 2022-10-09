const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { User } = require("../models");
const { RequestError } = require("../helpers");

const generateJwt = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.SECRET);
  return token;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, "Email or password is wrong!");
  }

  const token = generateJwt(user._id, email);

  // const u = await User.findOneAndUpdate({ _id: user._id }, { $set: { token } });
  return token;
};

module.exports = login;
