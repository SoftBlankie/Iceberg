const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const routes = require('../api');
const { winston, loggers } = require('winston');
const { Container } = require('typedi');

module.exports = async (app) => {
  app.use(bodyParser.json());

  app.use(config.api.prefix, routes(app));

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
};
