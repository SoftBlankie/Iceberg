const { winston } = require('winston');
const { Container } = require('typedi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../loaders/winston');
const config = require('../config');

module.exports = class authService {
  constructor(logger, userModel) {
    this.userModel = userModel;
    this.logger = logger;
  }

  generateJWTToken(user, expire) {
    const today = new Date();
    const exp = new Date(today);
    if (expire) {
      exp.setDate(today.getDate() + 1);
    } else {
      exp.setDate(today.getDate() + 365);
    }
    try {
      const token = jwt.sign(
        {
          _id: user._id, // We are gonna use this in the middleware 'isAuth'
          username: user.username,
        },
        config.jwtSecret,
        { expiresIn: exp.getTime() }
      );
      return token;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  signupUser(newUser, callback) {
    this.logger.info(
      `Signing up the user ${newUser.username} ${newUser.email}`
    );

    newUser.email = newUser.email.toLowerCase();
    newUser.lowerUsername = newUser.username.toLowerCase();
    newUser.profilePicture = '/public/profilePics/default-profile.png';
    bcrypt.hash(newUser.password, 12).then((hash) => {
      newUser.password = hash;

      let newUserObject = new this.userModel(newUser);
      newUserObject.save((err) => {
        if (err) {
          this.logger.error(
            `Error creating new user ${newUser.username} ${newUser.email}`
          );
          this.logger.error(err);
        } else {
          logger.info(
            `Successfully signed up the new user ${newUser.username}`
          );
        }
        callback(newUser, newUserObject._id, err);
      });
    });
  }

  checkUniqueUsername(username, callback) {
    let query = username.toLowerCase();
    this.userModel.find({ lowerUsername: query }, (err, user) => {
      if (err) {
        callback(false, err);
      } else if (!user || user.length !== 0) {
        callback(false, err);
      } else {
        callback(true, err);
      }
    });
  }

  checkUniqueEmail(email, callback) {
    let query = email.toLowerCase();
    this.userModel.find({ email: query }, (err, user) => {
      if (err) {
        callback(false, err);
      } else if (!user || user.length !== 0) {
        callback(false, err);
      } else {
        callback(true, err);
      }
    });
  }
};
