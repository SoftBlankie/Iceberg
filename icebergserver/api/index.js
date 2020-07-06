const express = require('express');
const user = require('./routes/user');
const router = express.Router();

module.exports = () => {
  router.use('/user', user());  
  return router;
};