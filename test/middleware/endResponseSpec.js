"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , endResponse = require('../../src/middleware/endResponse')
  ;

// var spy = chai.spy(/* optional fnc*/);
chai.use(require('chai-spies'));

describe('endResponseSpec', function () {
    beforeEach(function () {});

    describe('Nominal operation', function () {
    	it('should call res.end', function (done) {
          var mockRes = {
            end: done
          };

          endResponse({}, mockRes);

    	});
    });

});