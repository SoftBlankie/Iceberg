const express = require('express');
const router = express.Router();
const { Container } = require('typedi');
const auth = require('../middleware/auth');
const crypto = require('crypto');
const mime = require('mime-types');

module.exports = () => {
  let logger = Container.get('logger');

  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  router.put('/upload', auth.required, (req, res) => {
    if (!req.files.file) {
      return res.status(400).end();
    }

    const file = req.files.file;

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
