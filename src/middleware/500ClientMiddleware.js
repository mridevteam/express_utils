'use strict';
// TODO ADD FUNCTIONAL WHEN AVAILABLE
//const isLocal = require('../functional/isLocalEnv');

/**
 * 500 Client middleware
 *
 * @param {string} view
 */
module.exports = function(view) {

  return (err, req, res, next) => {
    //if (isLocal()) {
    if (process.env.NODE_ENV == 'local' || !process.env.NODE_ENV) {
      console.error(err.stack);
    }

    res.status(err.status || 500).render(view);
  };

};

