"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , middleware = require('../../src/middleware/500ClientMiddleware')('500')
  ;

describe('500ClientMiddlewareSpec', function () {
    describe('Nominal operation', function () {
    	it('should default to 500 status and render 500', function (done) {
        var mockRes = {
          status: function (status) {
            expect(status).to.equal(500);
            return {
              render: (name) => {
                expect(name).to.equal('500');
                done();
              }
            }
          }
        }
          , mockError = {};

        middleware(mockError, {}, mockRes);
    	});

      it('should send error status if provided', function (done) {
        var mockRes = {
          status: function (status) {
            expect(status).to.equal(400);
            return {
              render: (name) => {
                expect(name).to.equal('500');
                done();
              }
            }
          }
        }
          , mockError = {
          status: 400
        };

        middleware(mockError, {}, mockRes);
      });

    });
});