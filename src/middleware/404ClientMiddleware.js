'use strict';

/**
 * Client 404 middleware
 *
 * @param {Object} req - ExpressJs Request object
 * @param {Object} res - ExpressJs Response object
 * @param {function} next - function to call when "done" to pass control to the next middleware
 */
module.exports = (req, res, next) => {
  res.status(404).render(`404`);
};
