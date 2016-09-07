"use strict";

var chai             = require('chai')
  , expect           = chai.expect
  , express     = require('express')
  , supertest   = require('supertest')
  , unauthorizedResponse = require('../src/unauthorizedResponse')
  ;

describe('unauthorizedResponseSpec', function () {

  function setUpExpressTestEnv () {
    let app = express()
      ;

    app.use(function(req, res, next) {
      unauthorizedResponse(res);
    });

    return app;
  }

  describe('Nominal operation', function () {
    it('should return 403 when called', function (done) {
        let expressApp = setUpExpressTestEnv();

      supertest(expressApp)
        .get('/')
        .expect(403)
        .end(done);
    });
  });
});
