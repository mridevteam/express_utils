'use strict';

var fs = require('fs')
  , path = require('path')
  ;

/**
 * Dynamically loads routes prefixed with fileName/
 * This allows the routes to tested more easily
 *
 * NOTE: Reads from the fs sync
 *
 * NOTE: If you would like a base root simply have a file called `root.js`
 *       This code takes that into account
 *
 * @param {ExpressApp} expressApp
 * @param {string} routesDir
 * @param {string} urlPrefix (default '/')
 */
function loadRoutes(expressApp, routesDir, urlPrefix) {
  var routes = fs.readdirSync(routesDir);

  function _filterOutNonJsFiles(filename) {
    return path.extname(path.join(routesDir, filename)) === '.js';
  }

  function _filterOutUnderscoreFiles(filename) {
    return !filename.startsWith('_')
  }

  function _mountRoute(filename) {
    var modulePath = path.join(routesDir, filename)
      , name = path.basename(modulePath, '.js')
      , route = name === 'root' ? urlPrefix : urlPrefix + name
      , routerModule = require(modulePath)
      ;

    expressApp.use(route, routerModule);
  }

  if (urlPrefix === undefined) {
    urlPrefix = '/';
  }

  routes
    .filter(_filterOutNonJsFiles)
    .filter(_filterOutUnderscoreFiles)
    .forEach(_mountRoute);
}

module.exports = {
  load: loadRoutes
};
