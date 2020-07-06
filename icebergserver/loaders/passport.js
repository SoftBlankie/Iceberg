const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { Container } = require('typedi');
const { Logger } = require('mongodb');

module.exports = (passport) => {
  var userModel = Container.get('userModel');
  const logger = Container.get('logger');
  passport.use(
    new LocalStrategy((username, password, done) => {
      userModel
        .findOne({ username })
        .then((user) => {
          if (user) {
            bcrypt.compare(password, user.password).then((res) => {
              if (!res) {
                logger.info(`Password for ${username} not matching`);
                return done(null, false, {
                  error: { password: 'is invalid' },
                });
              }
            });
          } else {
            logger.info(`Username ${username} is not found`);
            return done(null, false, {
              error: { username: 'is invalid' },
            });
          }
          logger.info('Successfully authenticated user');
          return done(null, user);
        })
        .catch(done);
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
      done(err, user);
    });
  });

  logger.info('Finished loading passport strategy!');
};
