const express = require('express');
const config = require('../config/config');
const bodyParser = require('body-parser');
const routes = require('../api');

module.exports = async (app) => {
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());
};