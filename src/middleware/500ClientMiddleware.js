'use strict';
// TODO ADD FUNCTIONAL WHEN AVAILABLE
//const isLocal = require('../functional/isLocalEnv');

/**
 * Render 500 page
 *
 * @param {Object} err - Error object
 * @param {Object} req - ExpressJs Request object
 * @param {Object} res - ExpressJs Response object
 * @param {function} next - function to call when "done" to pass control to the next middleware
 */
module.exports = (err, req, res, next) => {
  //if (isLocal()) {
  if (process.env.NODE_ENV == 'local' || !process.env.NODE_ENV) {
    console.error(err.stack);
  }

  res.status(err.status || 500).render(`500`);
};

