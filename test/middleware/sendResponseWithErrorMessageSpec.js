"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , sendResponseWithError = require('../../src/middleware/sendResponseWithErrorMessage')
  ;

// var spy = chai.spy(/* optional fnc*/);
chai.use(require('chai-spies'));

describe('sendResponseWithErrorMessageSpec', function () {
    beforeEach(function () {});

    describe('Nominal operation', function () {
    	it('should call send with err.message', function (done) {
    		var mockMsg = {
          message: 'test'
        },
          mockRes = {
            send: function (message) {
              expect(message).to.equal(mockMsg.message);
              done();
            }
          }
        ;

        sendResponseWithError(mockMsg, {}, mockRes);
    	});
    });
});