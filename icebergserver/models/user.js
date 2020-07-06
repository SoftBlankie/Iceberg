const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a full name'],
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
