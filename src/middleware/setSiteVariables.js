'use strict';

/**
 * Sets the site variables you pass over
 *
 * @param {Object} siteObject - contains any values you want stored on req.app.locals.__[key]
 *
 * @returns {Function}
 */
module.exports = function(siteObject = {}) {
  return function(req, res, next) {
    Object.keys(siteObject).forEach( _ => req.app.locals[`__${_}`] = siteObject[_] );
    next();
  };
};
