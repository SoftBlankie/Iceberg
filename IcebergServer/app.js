const express = require('express')

const config = require('./config/config')

async function startServer() {
  const app = express();

  await require('./loaders')(app);

  app.listen(config.port, (err) => {
    if (err) {
      console.log('Error trying to listen on port ' + config.port.toString());
      return;
    }

    console.log(`Started listening on port ${config.port}`);
  })
}

startServer();