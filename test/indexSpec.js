"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , expressUtils = require('../')
  ;


describe('indexSpec', function () {

    describe('Nominal operation', function () {
    	it('should operate correctly', function () {
          expect(typeof expressUtils).to.equal('object');
          expect(expressUtils.hasOwnProperty('middleware')).to.equal(true);
          expect(expressUtils.middleware.hasOwnProperty('error')).to.equal(true);
    	});
    });
});