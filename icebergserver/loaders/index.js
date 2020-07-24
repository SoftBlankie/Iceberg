const expressLoader = require('./express');
// load all the loaders
const winstonLoader = require('./winston');
const typediLoader = require('./typedi');
const mongooseLoader = require('./mongoose');

module.exports = async (expressApp) => {
  const mongoConnection = await mongooseLoader();
  winstonLoader.info('MongoDB connection established!');

  const userModel = {
    name: 'userModel',
    model: require('../models/user'),
  };

  const profileModel = {
    name: 'profileModel',
    model: require('../models/profile'),
  };

  await typediLoader([userModel, profileModel]);
  winstonLoader.info('Finished injecting dependencies');

  await expressLoader(expressApp);
  winstonLoader.info('Express connection established!');
};
