const { winston } = require('winston');
const { Container } = require('typedi');

module.exports = {
  signupUser(newUser) {
    const logger = Container.get('logger');
    logger.info(`Signing up the user ${newUser.username} ${newUser.email}`);

    userModel = Container.get('userModel');
    console.log(JSON.stringify(newUser, null, 2));
    var newUserObject = new userModel(newUser);
    newUserObject.save((err) => {
      if (err) {
        logger.error(err);
      }
    });
  },
};
