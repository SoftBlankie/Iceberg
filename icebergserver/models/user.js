const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },

    lowerUsername: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', User);
