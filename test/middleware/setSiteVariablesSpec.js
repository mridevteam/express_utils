"use strict";

var chai             = require('chai')
  , expect           = chai.expect
  , express     = require('express')
  , supertest   = require('supertest')
  , setSiteVariables = require('../../src/middleware/setSiteVariables')
  ;

// var spy = chai.spy(/* optional fnc*/);
chai.use(require('chai-spies'));

describe('setSiteVariablesSpec', function () {
  const TESTTITLE = 'aaaa'
    , TESTDESCRIPTION = 'bbbbb'
    , TESTMENUITEMS = [{'aaaa': 'aaaa'}]
    ;

  function setUpExpressTestEnv (objToSet, nextSpy) {
    let app = express()
      ;

    app.use(setSiteVariables(objToSet));
    app.use(nextSpy);
    app.use((req, res, next) => res.end());

    return app;
  }

  describe('Nominal operation', function () {
    it('should set title', function (done) {
      let nextSpy = chai.spy((req, res, next) => {
        res.write(req.app.locals.__title);

        next()
      })
        , expressApp = setUpExpressTestEnv({title: TESTTITLE}, nextSpy)
        ;

      supertest(expressApp)
        .get('/')
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);

          expect(nextSpy).to.have.been.called();

          expect(res.text).to.equal(TESTTITLE);

          done(err);
        });
    });
    it('should set description', function (done) {
      let nextSpy = chai.spy((req, res, next) => {
        res.write(req.app.locals.__description);

        next()
      })
        , expressApp = setUpExpressTestEnv({description: TESTDESCRIPTION}, nextSpy)
        ;

      supertest(expressApp)
        .get('/')
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);

          expect(nextSpy).to.have.been.called();

          expect(res.text).to.equal(TESTDESCRIPTION);

          done(err);
        });
    });
    it('should set menu items', function (done) {
      let nextSpy = chai.spy((req, res, next) => {
        res.write(JSON.stringify(req.app.locals.__menuItems));

        next()
      })
        , expressApp = setUpExpressTestEnv({menuItems: TESTMENUITEMS}, nextSpy)
        ;

      supertest(expressApp)
        .get('/')
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);

          expect(nextSpy).to.have.been.called();

          expect(res.text).to.equal(JSON.stringify(TESTMENUITEMS));

          done(err);
        });
    });
    it('should set all the things', function (done) {
      let nextSpy = chai.spy((req, res, next) => {

        res.write(JSON.stringify(req.app.locals));

        next()
      })
        , expressApp = setUpExpressTestEnv({
            menuItems: TESTMENUITEMS
            , description: TESTDESCRIPTION
            , title: TESTTITLE
          }, nextSpy)
        ;

      supertest(expressApp)
        .get('/')
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);

          expect(nextSpy).to.have.been.called();

          let parsed = JSON.parse(res.text);

          expect(parsed.__title).to.equal(TESTTITLE);
          expect(parsed.__description).to.equal(TESTDESCRIPTION);
          expect(parsed.__menuItems).to.eql(TESTMENUITEMS);

          done(err);
        });
    });
  });
});
