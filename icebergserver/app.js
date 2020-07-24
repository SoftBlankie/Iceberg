const express = require('express');

const config = require('./config');
const { Container } = require('typedi');

async function startServer() {
  const app = express();

  await require('./loaders')(app);

  const logger = Container.get('logger');

  app.listen(config.port, (err) => {
    if (err) {
      logger.error(
        'Houston, we have an issue, server did not launch successfully'
      );
      return;
    }

    logger.info(`Started listening on port ${config.port}`);
  });
}

startServer();
