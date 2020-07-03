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

  generateJWTToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        username: user.username,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }

  signupUser(newUser, callback) {
    this.logger.info(
      `Signing up the user ${newUser.username} ${newUser.email}`
    );

    bcrypt.hash(newUser.password, 12).then((hash) => {
      newUser.password = hash;

      var newUserObject = new this.userModel(newUser);
      newUserObject.save((err) => {
        if (err) {
          logger.error(err);
        }
        callback(newUser, err);
      });
    });
  }

  authUser(authUser, callback) {
    this.logger.info(`Trying to authenticate the user ${authUser.username}`);

    this.userModel.findOne({ username }).then((user) => {
      if (!user) {
        bcrypt.compare(authUser.password, user.password).then((res) => {
          if (!res) {
            logger.info(
              `Incorrect credentials for the user ${authUser.username}`
            );
          }
        });
      } else {
        callback(jwt, err);
      }
    });
  }
};
