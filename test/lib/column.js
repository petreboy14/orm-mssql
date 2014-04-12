var Joi = require('joi');
var Lab = require('lab');
var should = require('should');
var Types = require('tedious').TYPES;

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var Column = require('../../lib/column');

describe('Column tests', function () {
  it('should throw if no type is given to Column constructor', function (done) {
    try {
      var col = new Column();
    } catch (err) {
      should.exist(err);
      done();
    }
  });

  it('should throw if an invalid type is given to Column constructor', function (done) {
    try {
      var col = new Column({
        type: 'FooBar'
      });
    } catch (err) {
      should.exist(err);
      done();
    }
  });

  it('should throw if an invalid typed name is given to Column constructor', function (done) {
    try {
      var col = new Column({
        type: {
          type: 'FooBar'
        }
      });
    } catch (err) {
      should.exist(err);
      done();
    }
  });

  it('should be able to create an instance of Column', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar
    });
    done();
  });

  it('should be able to validate against the defined column type', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 'test' }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to add extra validations for a column', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      maxLength: 10,
      minLength: 2
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 't' }, schema);
    should.exist(err);
    done();
  });

  it('should be able to validate a string based column is of a certain length', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      length: 5
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 'test!' }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate a string based column using regex', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      regex: /test/
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 'test' }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate that a string only is alphanumeric', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      alphanum: true
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 'test!!@@@@_$$((@))' }, schema);
    should.exist(err);
    done();
  });

  it('should be able to validate that a string is a valid token', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      token: true
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 'i_am_a_token' }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate that a string is an email', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      email: true
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 'test@test.com' }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate that a string is an isoDate', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      isoDate: true
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: '2014-04-11T23:54:47.260Z' }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate a number with no extra validations', function (done) {
    var col = new Column({
      type: Column.TYPES.Int
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 4 }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate that a number is between a certain amount', function (done) {
    var col = new Column({
      type: Column.TYPES.Int,
      min: 2,
      max: 5
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 4 }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to set a max for a number only', function (done) {
    var col = new Column({
      type: Column.TYPES.Int,
      max: 5
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 6 }, schema);
    should.exist(err);
    done();
  });

  it('should be able to validate that a decimal number is between a certain amount', function (done) {
    var col = new Column({
      type: Column.TYPES.Float,
      min: 1,
      max: 6
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 4 }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate that a decimal number lower than a certain amount', function (done) {
    var col = new Column({
      type: Column.TYPES.Float,
      max: 6
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 2.2 }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate that a date is after than another date', function (done) {
    var col = new Column({
      type: Column.TYPES.DateTime,
      min: new Date('2013-01-01')
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: new Date('2014-01-01') }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate that a date is before than another date', function (done) {
    var col = new Column({
      type: Column.TYPES.DateTime,
      max: new Date('2014-01-01')
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: new Date('2013-01-01') }, schema);
    should.not.exist(err);
    done();
  });

  it('should be able to validate that a notNull column requires a value', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      notNull: true
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: null }, schema);
    should.exist(err);
    done();
  });

  it('should allow users to specify an enum', function (done) {
    var col = new Column({
      type: Column.TYPES.NVarChar,
      enum: ['foo', 'bar', 'test']
    });
    var schema = { val: col.validation };
    var err = Joi.validate({ val: 'foo' }, schema);
    should.not.exist(err);
    err = Joi.validate({ val: 'asdsadsad' }, schema);
    should.exist(err);
    done();
  });
});
