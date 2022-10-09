const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please provide first_name"],
    },

    last_name: String,

    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: [true, "Email already in use"],
    },

    phone: Number,

    password: { type: String, required: [true, "Please enter password"] },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
