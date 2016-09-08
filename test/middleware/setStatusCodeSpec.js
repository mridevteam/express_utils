"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , setStatus = require('../../src/middleware/setStatusCode')
  ;

// var spy = chai.spy(/* optional fnc*/);
chai.use(require('chai-spies'));

describe('setStatusCodeSpec', function () {
    beforeEach(function () {});

    describe('Nominal operation', function () {
    	it('should set the status code with error passed in', function (done) {
    		var mockError = {
          status: 999
        },
          mockRes = {
            status: function (v) {
              expect(v).to.equal(999);
            }
          }
        ;
        setStatus(mockError, {}, mockRes, function (err) {
          done();
        });

    	});

      it('should set the status code to 500 if no status', function (done) {
        var mockError = {
          },
          mockRes = {
            status: function (v) {
              expect(v).to.equal(500);
            }
          }
          ;
        setStatus(mockError, {}, mockRes, function () {
          done();
        });

      });
    });
});