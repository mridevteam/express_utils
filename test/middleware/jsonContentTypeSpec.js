"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , jsonContent = require('../../src/middleware/jsonContentType')
  ;

// var spy = chai.spy(/* optional fnc*/);
chai.use(require('chai-spies'));

describe('jsonContentTypeSpec', function () {
    beforeEach(function () {});

    describe('Nominal operation', function () {
    	it('should set the content type', function (done) {
      		var mockRes = {
            set: function (x,y) {
              expect(x).to.equal('Content-Type');
              expect(y).to.equal('application/json');
            }
          }

          jsonContent({}, mockRes, done)
    	});
    });

});