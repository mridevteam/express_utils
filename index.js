'use strict';
var utils = {
  middleware: {
    error: {},
    logging: {}
  }
};

utils.routeLoader = require('./src/routeLoader');
utils.bootExpressServer = require('./src/bootExpressServer');
utils.unauthorizedResponse = require('./src/unauthorizedResponse');

utils.middleware.error[404] = require('./src/middleware/404Middleware');
utils.middleware.error['404'] = require('./src/middleware/404Middleware');
utils.middleware.error[500] = require('./src/middleware/500Middleware');
utils.middleware.error['500'] = require('./src/middleware/500Middleware');
utils.middleware.error['404Client'] = require('./src/middleware/404ClientMiddleware');
utils.middleware.error['500Client'] = require('./src/middleware/500ClientMiddleware');
utils.middleware.error.setStatusCode = require('./src/middleware/setStatusCode');
utils.middleware.error.sendResponseWithErrorMessage = require('./src/middleware/sendResponseWithErrorMessage');

utils.middleware.endResponse = require('./src/middleware/endResponse');
utils.middleware.allowCrossOrigin = require('./src/middleware/allowCrossOrigin');
utils.middleware.setJsonContentType = require('./src/middleware/jsonContentType');
utils.middleware.setSiteVariables = require('./src/middleware/setSiteVariables');
utils.middleware.autoUpdateMenuItemBasedOnPath = require('./src/middleware/autoUpdateMenuItemBasedOnPath');


module.exports = utils;