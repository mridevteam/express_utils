'use strict';

/**
 *  Client 404 middleware
 *
 * @param {string} view
 */
module.exports = function(view) {
  return (req, res, next) => {
    res.status(404).render(view);
  };
};

