const bcrypt = require("bcrypt");
const { User } = require("../models");
const { RequestError } = require("../helpers");

const add = async ({ first_name, last_name, email, phone, password }) => {
  if (!first_name || !email || !password) {
    throw RequestError(
      400,
      "Missing required filds: first_name, email or password"
    );
  }
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, `Email ${email} in use`);
  }

  const hashPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    first_name,
    last_name,
    email,
    phone,
    password: hashPassword,
  });
  newUser.save();

  return newUser;
};

module.exports = add;
