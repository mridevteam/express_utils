"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , middleware = require('../../src/middleware/404ClientMiddleware')
  ;

describe('404ClientMiddlewareSpec', function () {
    describe('Nominal operation', function () {
    	it('should operate correctly', function (done) {
        var mockRes = {
          status: function () {
            return {
              render: (name) => {
                expect(name).to.equal('404');
                done();
              }
            }
          }
        };

        middleware({}, mockRes);
    	});
    });

});