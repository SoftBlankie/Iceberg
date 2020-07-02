const dotenv = require('dotenv');
const envExists = dotenv.config();

if (envExists.error) {
  throw new Error('Unable to find .env file');
}

module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.MONGODB_URI,
  api: {
    prefix: '/api'
  }
}