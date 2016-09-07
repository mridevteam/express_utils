"use strict";

var chai         = require('chai')
  , expect       = chai.expect
  , express      = require('express')
  , supertest    = require('supertest')
  , middleware = require('../../src/middleware/404Middleware')
  ;

chai.use(require('chai-spies'));

describe('404MiddlewareSpec', function () {
  let app = express()
    ;

  app.get('/', function(req, res, next) {
    res.json({'ok': true});
    res.end();
  });

  app.use(middleware);

  it('should 404', function (done) {
    supertest(app)
      .get('/this/obviously_doesnt/exist')
      .expect(404)
      .end(function(err, res) {
        expect(err).to.equal(null);

        done(err);
      })
  });
});
