const express = require('express');
const user = require('./routes/user');
const router = express.Router();

module.exports = () => {
  user(router);
  return router;
};