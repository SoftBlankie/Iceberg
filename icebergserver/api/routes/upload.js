const express = require('express');
const { celebrate, Joi } = require('celebrate');
const router = express.Router();
const { Container } = require('typedi');
const auth = require('../middleware/auth');
const passport = require('passport');

module.exports = () => {
  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  router.put('/uploadProfilePicture', (req, res) => {});

  return router;
};
