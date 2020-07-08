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
    let expireString = '';
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

    newUser.lowerUsername = newUser.username.toLowerCase();

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
};
