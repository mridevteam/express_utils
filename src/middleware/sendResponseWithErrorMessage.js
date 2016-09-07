/* jshint -W098*/
module.exports = function(err, req, res, next) {
  'use strict';
  res.send(err.message);
};
