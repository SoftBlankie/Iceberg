const mongoose = require('mongoose');
const config = require('../config');
const { Container } = require('typedi');

module.exports = async () => {
  const connection = await mongoose.connect(config.databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return connection;
};
