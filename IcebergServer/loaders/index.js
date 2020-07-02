const expressLoader = require('./express');
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

  typediLoader([userModel]);
  winstonLoader.info('Finished injecting dependencies');

  await expressLoader(expressApp);
  winstonLoader.info('Express connection established!');
};
