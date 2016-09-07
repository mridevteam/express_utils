"use strict";

var chai             = require('chai')
  , expect           = chai.expect
  , express     = require('express')
  , supertest   = require('supertest')
  , autoUpdateMenuItem = require('../../src/middleware/autoUpdateMenuItemBasedOnPath')
  ;

chai.use(require('chai-spies'));

describe('autoUpdateMenuItemSpec', function () {
  const TESTMENUITEMS = [{
          display: "Test 1",
          href: "/",
          class: "extraclass extraclass2",
          isCurrent: false
        }]
    ;

  function setUpExpressTestEnv (objToSet, nextSpy) {
    let app = express()
      ;

    app.use(function(req, res, next) {
      req.app.locals.__menuItems = objToSet.menuItems;

      next();
    });

    app.use(autoUpdateMenuItem());
    app.use(nextSpy);
    app.use(function(req, res, next) {return res.end()});

    return app;
  }

  describe('Nominal operation', function () {
    it('should update', function (done) {
      let nextSpy = chai.spy(function(req, res, next) {
        res.write(JSON.stringify(req.app.locals.__menuItems));

        next();
      })
        , expressApp = setUpExpressTestEnv({menuItems: TESTMENUITEMS}, nextSpy)
        ;

      supertest(expressApp)
        .get('/')
        .expect(200)
        .end(function(err, res) {
          expect(err).to.equal(null);

          expect(nextSpy).to.have.been.called();

          let parsed = JSON.parse(res.text)
            , hrefHome = parsed.find(function(menu) {return menu.href === '/'})
            ;

          expect(hrefHome).to.not.equal(null);
          expect(hrefHome).to.not.equal(undefined);
          expect(hrefHome.isCurrent).to.equal(true);

          done(err);
        });
    });
  });
});
