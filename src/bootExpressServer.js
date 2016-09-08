
'use strict';
var http = require('http')
  ;

/**
 * Normalize a port into a number, string, or false.
 */
const reqParam = require('validity_checks').requiredParameter
  ;

let normalizePort = (val) => {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
   throw new Error('port must be a number');
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
  , onError = (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    let bind = `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  , onListening = () => {
    let addr = server.address()
      , bind = `port ${addr.port}`
      ;

    console.log(`Listening on ${bind}`);
  }
  , cleanUpRoutine = (server) => {
    server.close(() => process.exit(0));
  }
, server = undefined
, port = undefined
;

module.exports = function(expressApp = reqParam('expressApp'), requestedPort = reqParam('requestedPort'), timeout = 4000) {
  port = normalizePort(requestedPort);
  server = http.createServer(expressApp);

  expressApp.set('port', port);

  server.listen(port);
  server.timeout = timeout;
  server.on('error', onError);
  server.on('listening', onListening);

  process.on('SIGTERM', () => {
    cleanUpRoutine(server);
  });

  process.on('SIGINT', () => {
    cleanUpRoutine(server);
  });

  return server;
};
