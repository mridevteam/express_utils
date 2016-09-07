'use strict';

let testRouter = require('express').Router()
  ;

module.exports = testRouter;

testRouter.get('/', function(req, res, next) {
  res.status(200);
  res.end();
});

testRouter.get('/error', function(req, res, next) {
  res.status(500);
  res.end();
})
