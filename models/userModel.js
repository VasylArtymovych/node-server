const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },

    last_name: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: Number,

    password: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
