var Joi = require('joi');
var Lab = require('lab');
var should = require('should');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var Schema = require('../../lib/schema');

describe('Schema tests', function () {
  it('should have a valid TYPES object', function (done) {
    should.exist(Schema.Types);
    Schema.Types.should.be.an.instanceOf(Object);
    done();
  });

  it('should be able to create a valid schema without error', function (done) {
    var schema = new Schema({
      name: {
        type: Schema.Types.NVarChar,
        min: 2,
        max: 50
      }
    });
    done();
  });

  it('should throw an error on a bad type sent to schema creation', function (done) {
    try {
      var schema = new Schema({
        name: {
          type: String,
          min: 2,
          ma: 50
        }
      });
    } catch (err) {
      should.exist(err);
      done();
    }
  });
});
