module.exports = function(err, req, res, next) {
  'use strict';

  res.status(err.status || 500);

  next(err);
};
