const jwt = require('express-jwt');
const config = require('../../config');

const auth = {
  required: jwt({
    secret: config.jwtSecret,
    userProperty: 'payload',
    getToken: (req) => req.cookies.token,
    algorithms: ['HS256'],
  }),
  optional: jwt({
    secret: config.jwtSecret,
    userProperty: 'payload',
    getToken: (req) => req.cookies.token,
    credentialsRequired: false,
    algorithms: ['HS256'],
  }),
};

module.exports = auth;
