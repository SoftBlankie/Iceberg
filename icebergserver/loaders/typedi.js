const { Container } = require('typedi');
const logger = require('./winston');
const AuthService = require('../services/authService');
const ProfileService = require('../services/profileService');

module.exports = async (models) => {
  // set mongoose models
  models.forEach((model) => {
    Container.set(model.name, model.model);
  });

  // set logger
  Container.set('logger', logger);

  // set authService with userModel
  Container.set(
    'authService',
    new AuthService(logger, Container.get('userModel'))
  );

  // set profileService with profileModel
  Container.set(
    'profileService',
    new ProfileService(logger, Container.get('profileModel'))
  );
};
