const jwt = require('express-jwt');
const config = require('../../config');

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

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
