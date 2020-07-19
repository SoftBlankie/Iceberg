const express = require('express');
const { celebrate, Joi } = require('celebrate');
const router = express.Router();
const { Container } = require('typedi');
const auth = require('../middleware/auth');
const passport = require('passport');
const jwt = require('express-jwt');
const logger = require('../../loaders/winston');

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
          msg: 'Successfully created new user!',
          username: newUser.username,
          error: '',
        });
      } else {
        logger.info(
          `Did not successfully sign up the new user ${newUser.username}`
        );
        return res.send({
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
            // TODO: for dev purposes only, leave as false to avoid https
            secure: false,
            sameSite: 'none',
          });
          return res.json({
            msg: 'Successfully logged in!',
            username: user.username,
            error: '',
            token: token,
          });
        }

        return res.json({
          error: 'Incorrect credentials!',
        });
      })(req, res, next);
    }
  );

  router.get('/validToken', auth.optional, (req, res) => {
    if (!req.cookies.token) {
      return res.json({
        error: 'Token not found',
      });
    }

    return res.json({
      error: '',
    });
  });

  router.get('/logout', auth.optional, (req, res) => {
    res.clearCookie('token', { path: '/', domain: 'localhost' });
    res.status(200).end();
  });

  router.get('/user', auth.required, (req, res) => {
    res.send('lmao you did it');
  });

  router.post('/uniqueUsername', auth.optional, (req, res) => {
    const authService = Container.get('authService');
    authService.checkUniqueUsername(req.body.username, (unique, err) => {
      if (err) {
        logger.error('Error while checking unique username');
        logger.error(err);
        return res.json({
          error: 'Internal server error',
        });
      }
      if (unique) {
        return res.json({
          error: '',
        });
      }
      return res.json({
        error: 'Not a unique username',
      });
    });
  });

  router.post('/uniqueEmail', auth.optional, (req, res) => {
    const authService = Container.get('authService');
    authService.checkUniqueEmail(req.body.email, (unique, err) => {
      if (err) {
        logger.error('Error while checking unique email');
        logger.error(err);
        return res.json({
          error: 'Internal server error',
        });
      }
      if (unique) {
        return res.json({
          error: '',
        });
      }
      return res.json({
        error: 'Not a unique email',
      });
    });
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
