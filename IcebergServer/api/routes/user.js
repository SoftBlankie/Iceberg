const express = require('express');
const { celebrate, Joi } = require('celebrate');
const router = express.Router();
const winston = require('winston');
const { Container } = require('typedi');
module.exports = () => {
  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  signupSchema = {
    body: {
      username: Joi.string().min(3).max(16).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().min(6).max(100).required(),
    },
  };

  router.post('/signup', celebrate(signupSchema), async (req, res) => {
    const authService = Container.get('authService');
    authService.signupUser(req.body);
    res.send({ msg: 'moo?' });
  });

  router.use((error, req, res, next) => {
    // joi error
    if (error.joi) {
      // return code 400 (bad request)
      return res.status(400).json({ error: error.joi.message });
    }

    // return code 500 (internal server error)
    return res
      .status(500)
      .json({ error: "Something went horribly wrong! We're investigating!" });
  });

  return router;
};
