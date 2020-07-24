const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { Container } = require('typedi');

module.exports = (passport) => {
  // get user model from container
  var userModel = Container.get('userModel');
  const logger = Container.get('logger');

  // set new local strategy for authentication
  passport.use(
    new LocalStrategy((username, password, done) => {
      userModel
        .findOne({ lowerUsername: username.toLowerCase() })
        .then((user) => {
          // attempt to find a user based on lowercase username query
          if (!user) {
            logger.info(`Username ${username} is not found`);
            return done(null, false, {
              error: { username: 'is invalid' },
            });
          }

          bcrypt.compare(password, user.password).then((res) => {
            if (!res) {
              logger.info(`Password for ${username} not matching`);
              return done(null, false, {
                error: { password: 'is invalid' },
              });
            }
            logger.info('Successfully authenticated user');
            return done(null, user);
          });
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
