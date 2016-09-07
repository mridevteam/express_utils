"use strict";
var path = require('path')
  , express = require('express')
  , chai = require('chai')
  ,	expect = chai.expect
  , supertest = require('supertest')
  , routeLoader = require('../src/routeLoader')
  ;

var testRoutesDir = path.join(__dirname, '/test_routes');

describe('routeLoaderSpec', function () {
  function setUpExpressTestEnv () {
    let app = express()
      ;

    return app;
  }

    describe('Nominal operation', function () {
    	it('should hit base route', function (done) {
        var app = setUpExpressTestEnv();
        routeLoader.load(app, testRoutesDir, '/');

        supertest(app)
          .get('/test')
          .expect(200)
          .end(done);
    	});

      it('should hit additional routes', function (done) {
        var app = setUpExpressTestEnv();
        routeLoader.load(app, testRoutesDir, '/');

        supertest(app)
          .get('/test/error')
          .expect(500)
          .end(done);
      });

      it('should accept a baseURL and add that to the routing', function (done) {
        var app = setUpExpressTestEnv();
        routeLoader.load(app, testRoutesDir, '/base/');

        supertest(app)
          .get('/base/test/error')
          .expect(500)
          .end(done);
      });


    });

    describe('Error conditions', function () {
    	it('should 404 on routes not loaded', function (done) {
        var app = setUpExpressTestEnv();
        routeLoader.load(app, testRoutesDir);

        supertest(app)
          .get('/test/nonefound')
          .expect(404)
          .end(done);
    	});
    });
});