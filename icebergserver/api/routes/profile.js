const express = require('express');
const router = express.Router();
const { Container } = require('typedi');
const auth = require('../middleware/auth');

module.exports = () => {
  let logger = Container.get('logger');

  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  // upload profile picture
  router.put('/upload', auth.required, (req, res) => {
    if (!req.files.file) {
      return res.status(400).end();
    }
    const token = req.cookies.token;
    const file = req.files.file;

    let profileService = Container.get('profileService');
    profileService.updateProfilePicture(file, token, (err) => {
      if (err) {
        return res.status(400).end();
      }
      return res.status(200).end();
    });
  });

  return router;
};
