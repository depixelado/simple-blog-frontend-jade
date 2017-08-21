const config = require('./config');
const app = require('./appBootstrap');

/**
 * @function initServer
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @description Init the server
 */
function initServer() {
  // Start server
  app.listen(config.app.port);
  console.log(`Server listenging on: ${config.app.port}`);
}

initServer();
