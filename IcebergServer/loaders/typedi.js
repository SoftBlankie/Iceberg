const { Container } = require('typedi');
const logger = require('./winston');
const AuthService = require('../services/authService');

module.exports = async (models) => {
  models.forEach((model) => {
    Container.set(model.name, model.model);
  });

  Container.set('logger', logger);
  Container.set(
    'authService',
    new AuthService(logger, Container.get('userModel'))
  );
};
