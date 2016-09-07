"use strict";

var chai         = require('chai')
  , expect       = chai.expect
  , express      = require('express')
  , supertest    = require('supertest')
  , middleware = require('../../src/middleware/500Middleware')
  ;

chai.use(require('chai-spies'));

describe('500MiddlewareSpec', function () {
  let app = express()
    ;

  app.get('/error', function(req, res, next) {
    throw new Error('omgz an error');
  });

  app.use(middleware);

  it('should 500', function (done) {
    supertest(app)
      .get('/error')
      .expect(500)
      .end(function(err, res) {
        expect(err).to.equal(null);

        expect(res.error).to.not.equal(undefined);
        expect(res.error.status).to.equal(500);
        expect(JSON.parse(res.error.text)).to.eql({error: 'omgz an error'});

        done(err);
      })
  });
});
