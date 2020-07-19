const express = require('express');
const user = require('./routes/user');
const profile = require('./routes/profile');
const router = express.Router();

module.exports = () => {
  router.use('/user', user());
  router.use('/profile', profile());
  return router;
};
