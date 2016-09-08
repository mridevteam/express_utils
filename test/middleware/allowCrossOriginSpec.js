"use strict";

var chai             = require('chai')
  , expect           = chai.expect
  , supertest = require('supertest')
  , express = require('express')
  , allowCrossOrigin = require('../../src/middleware/allowCrossOrigin')
  ;

// var spy = chai.spy(/* optional fnc*/);
chai.use(require('chai-spies'));

describe('allowCrossOriginSpec', function () {
  let mockRes = {
    header: chai.spy(function () {})
  };

  describe('Nominal operation', function () {
    it('should call all the correct methods', function () {
      let mockNext = chai.spy()
        ;

      allowCrossOrigin({}, mockRes, mockNext);

      expect(typeof allowCrossOrigin).to.equal('function');
      expect(mockNext).to.have.been.called();
      expect(mockRes.header).to.have.been.called.exactly(2);
    });

    it('should function properly on non-options', function (done) {
      var app = express();
      var router = express.Router();

      router.get('/test', function(req, res, next) { next(); });

      app.use(allowCrossOrigin);
      app.use(router);

      supertest(app)
        .get('/test')
        .end(function(err, res) {
          let aco = res.headers['access-control-allow-origin']
            , ach = res.headers['access-control-expose-headers']
            ;

          expect(aco).to.equal('*');
          expect(ach).to.equal('Origin, X-Requested-With, Content-Type, Accept');

          done();
        });
    });

    it('should function properly on options call', function (done) {
      var app = express();
      var router = express.Router();

      router.get('/test', function(req, res, next) { next(); });

      app.use(allowCrossOrigin);
      app.use(router);

      supertest(app)
        .options('/test')
        .end(function(err, res) {
          let aco = res.headers['access-control-allow-origin']
            , ach = res.headers['access-control-expose-headers']
            , meth = res.headers['access-control-allow-methods']
            ;

          expect(aco).to.equal('*');
          expect(ach).to.equal('Origin, X-Requested-With, Content-Type, Accept');
          expect(meth).to.equal('GET,HEAD,PUT,PATCH,POST,DELETE');

          done();
        });
    });
  });
});
