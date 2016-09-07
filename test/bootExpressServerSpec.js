"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , express = require('express')
  , bootExpressServer = require('../src/bootExpressServer')
  ;

// var spy = chai.spy(/* optional fnc*/);
chai.use(require('chai-spies'));

describe('bootExpressServerSpec', function () {

    describe('Nominal operation', function () {
    	it('should be listening on the passed in port', function () {
          var server = bootExpressServer(express(), 8989);
          expect(server.address().port).to.equal(8989);
      });
    });

    describe('Error conditions', function () {
    	it('throw if not provided an express app', function () {
          expect(function () {
            bootExpressServer();
          }).to.throw();
    	});

      it('throw if not provided a port', function () {
        expect(function () {
          bootExpressServer({});
        }).to.throw();
      });
    });
});