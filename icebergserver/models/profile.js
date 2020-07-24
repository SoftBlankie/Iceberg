const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const Profile = new mongoose.Schema(
  {
    userId: {
      type: ObjectID,
      required: true,
    },

    displayName: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      required: true,
    },

    biography: {
      type: String,
      required: true,
    },

    likes: {
      type: Array,
      required: true,
    },

    dislikes: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', Profile);
