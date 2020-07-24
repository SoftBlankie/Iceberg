const jwt = require('jsonwebtoken');
const config = require('../config');
const crypto = require('crypto');
const mime = require('mime-types');

module.exports = class profileService {
  constructor(logger, profileModel) {
    this.profileModel = profileModel;
    this.logger = logger;
  }

  /*
  userId: {
      type: Number,
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
  */

  // create a new profile with default values
  createProfile(username, userId, callback) {
    let newProfile = {
      userId: userId,
      displayName: username,
      profilePicture: '/public/profilePics/default-profile.png',
      biography: 'No biography set',
      likes: [],
      dislikes: [],
    };

    let newProfileObject = new this.profileModel(newProfile);

    newProfileObject.save((err) => {
      if (err) {
        this.logger.error(
          `Error creating new profile for ${username} ${userId}`
        );
        this.logger.error(err);
      } else {
        this.logger.info(
          `Successfully created a new profile ${newUser.username}`
        );
      }
      callback(err);
    });
  }

  // store profile picture and update field
  updateProfilePicture(file, token, callback) {
    // get the destination and file name
    let ext = mime.extension(file.mimetype);
    let hashLoc = crypto.randomBytes(10).toString('hex') + '.' + ext;
    let dest = 'public/profilePics/' + hashLoc;
    this.logger.info(`Writing received file into ${hashLoc}`);

    // move file into destination
    file.mv(dest, (err) => {
      if (err) {
        this.logger.err(`Error writing ${hashLoc}`);
        this.logger.err(err);
        this.logger.err(req.files.file);
        return callback(err);
      }

      this.logger.info(`Finished writing received file into ${hashLoc}`);

      // verify authentic jwt
      jwt.verify(token, config.jwtSecret, (err2, decoded) => {
        // invalid
        if (err2) {
          this.logger.error(err2);
          return callback(err);
        }

        // update profilePicture field
        let userId = decoded._id;
        this.profileModel.findOneAndUpdate(
          { userId: userId },
          { profilePicture: dest },
          (err3, res) => {
            if (err3) {
              this.logger.error(err3);
            } else {
              this.logger.info(
                `Finished updating profilePicture field ${dest} for ${userId}`
              );
            }
            return callback(err);
          }
        );
      });
    });
  }
};
