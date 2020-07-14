const express = require('express');
const user = require('./routes/user');
const upload = require('./routes/upload');
const router = express.Router();

module.exports = () => {
  router.use('/user', user());
  router.use('/upload', upload());
  return router;
};
