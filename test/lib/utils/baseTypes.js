var Lab = require('lab');
var should = require('should');
var Types = require('tedious').TYPES;

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var baseTypes = require('../../../lib/utils/baseTypes');

describe('baseTypes tests', function () {
  it('should return an object made up of type and validation parameters', function (done) {
    var types = baseTypes();
    should.exist(types);
    types.should.be.an.instanceOf(Object);
    for (var key in types) {
      if (types[key].base === Number) {
        types[key].should.have.keys(['type', 'validation', 'base', 'int']);  
      } else {
        types[key].should.have.keys(['type', 'validation', 'base']);
      }
    }
    done();
  });

  it('should throw an error when given a type that is not represented in baseTypes', function (done) {
    try {
      var types = baseTypes({ TEST: {} });
    } catch (err) {
      should.exist(err);
      done();
    }
  });
});
