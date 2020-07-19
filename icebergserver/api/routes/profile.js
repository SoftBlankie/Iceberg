const express = require('express');
const { celebrate, Joi } = require('celebrate');
const router = express.Router();
const { Container } = require('typedi');
const auth = require('../middleware/auth');
const passport = require('passport');
const fs = require('fs');
const crypto = require('crypto');
const mime = require('mime-types');

module.exports = () => {
  let logger = Container.get('logger');

  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  router.put('/upload', (req, res) => {
    if (!req.files.file) {
      return res.status(400).end();
    }
    console.log(req.files);
    const file = req.files.file;
    console.log(typeof req.files.file);

    let ext = mime.extension(req.files.file.mimetype);
    let hashLoc = crypto.randomBytes(10).toString('hex') + '.' + ext;

    logger.info(`Writing received file into ${hashLoc}`);
    file.mv('public/profilePics/' + hashLoc, (err) => {
      if (err) {
        logger.err(`Error writing ${hashLoc}`);
        logger.err(err);
        logger.err(req.files.file);
        return res.status(400).end();
      }
      logger.info(`Finished writing received file into ${hashLoc}`);
      return res.status(200).end();
    });
  });

  return router;
};
