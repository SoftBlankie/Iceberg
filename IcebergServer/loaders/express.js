const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const routes = require('../api');
const { winston, loggers } = require('winston');
const { Container } = require('typedi');
const passport = require('passport');
const passportLoader = require('./passport');
const session = require('express-session');

module.exports = async (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // initialize passport
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  passportLoader(passport);

  // connect our routes with router
  app.use(config.api.prefix, routes(app, passport));

  // error handling
  if (process.env.NODE_ENV == 'production') {
    // don't return error if production
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        errors: {},
      });
    });
  } else {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    });
  }

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
};
