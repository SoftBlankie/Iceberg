const mongoose = require('mongoose');
const config = require('../config');
const autoIncrement = require('mongoose-auto-increment');

module.exports = async () => {
  const connection = await mongoose.connect(config.databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  autoIncrement.initialize(connection);

  return connection;
};
