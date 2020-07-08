const express = require('express');
const { celebrate, Joi } = require('celebrate');
const router = express.Router();
const { Container } = require('typedi');
const { Logger } = require('mongodb');
const auth = require('../middleware/auth');
const passport = require('passport');
const { json } = require('body-parser');

module.exports = () => {
  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  var signupSchema = {
    body: {
      username: Joi.string().min(3).max(16).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().min(6).max(100).required(),
    },
  };

  router.post('/signup', auth.optional, (req, res) => {
    const logger = Container.get('logger');

    const authService = Container.get('authService');
    authService.signupUser(req.body, (newUser, err) => {
      if (!err) {
        logger.info(`Successfully signed up the new user ${newUser.username}`);
        return res.send({
          status: 200,
          msg: 'Successfully created new user!',
          username: newUser.username,
          error: '',
        });
      } else {
        logger.info(
          `Did not successfully sign up the new user ${newUser.username}`
        );
        return res.send({
          status: 200,
          error: 'Did not successfully create new user.',
        });
      }
    });
  });

  var loginSchema = {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      expire: Joi.bool().required(),
    },
  };

  router.post(
    '/login',
    auth.optional,
    celebrate(loginSchema),
    (req, res, next) => {
      const logger = Container.get('logger');
      logger.info(`Trying to authenticate the user ${req.body.username}`);
      const authService = Container.get('authService');
      return passport.authenticate('local', (err, passportUser, info) => {
        if (err) {
          return next(err);
        }
        if (passportUser) {
          const user = passportUser;
          const token = authService.generateJWTToken(user, req.body.expire);
          res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          });
          return res.json({
            status: 200,
            msg: 'Successfully logged in!',
            username: user.username,
            error: '',
            token: token,
          });
        }

        return res.json({
          status: 200,
          error: 'Incorrect credentials!',
        });
      })(req, res, next);
    }
  );

  router.get('/logout', auth.optional, (req, res) => {
    res.clearCookie('token', { path: '/', domain: 'localhost' });
    res.status(200).end();
  });

  router.get('/user', auth.required, (req, res) => {
    res.send('lmao you did it');
  });

  router.use((error, req, res, next) => {
    const logger = Container.get('logger');

    logger.error(error);
    // joi error
    if (error.joi) {
      // return code 400 (bad request)
      return res.status(400).json({ error: error.joi.message });
    }

    if (error.status == 401) {
      return res
        .status(401)
        .json({ error: 'Unauthorized, who do you think you are punk!?' });
    }

    // return code 500 (internal server error)
    return res
      .status(500)
      .json({ error: "Something went horribly wrong! We're investigating!" });
  });

  return router;
};
