const { winston } = require('winston');
const { Container } = require('typedi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../loaders/winston');
const config = require('../config');

module.exports = class profileService {};
