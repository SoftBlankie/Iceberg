const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const routes = require('../api');
const { winston, loggers } = require('winston');
const { Container } = require('typedi');
const passport = require('passport');
const passportLoader = require('./passport');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

module.exports = async (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

  // for parsing cookies
  app.use(cookieParser());

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

  app.use(express.static(path.join(__dirname, '../../../icebergwebapp/build')));

  app.get('/*', (req, res) => {
    res.sendFile(
      path.join(__dirname + '../../../icebergwebapp/build/index.html')
    );
  });

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
};
