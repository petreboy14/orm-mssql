var Lab = require('lab');
var should = require('should');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var config = require('../../.test-config');
var pools = require('../../lib/pools');
var Connection = require('../../lib/connection');

describe('Connection tests', function () {
  before(function (done) {
    pools.init(config);
    done();
  });
  it('should be able to create a connection', function (done) {
    var conn = new Connection();
    should.exist(conn);
    should.exist(conn.pool);
    done();
  });

  it('should be able to start and stop a transaction with no options', function (done) {
    var conn = new Connection();
    conn.beginTransaction(function (err) {
      should.not.exist(err);
      conn.commitTransaction(function (err) {
        should.not.exist(err);
        done();
      });
    });
  });

  it('should be able to start and stop a transaction with options', function (done) {
    var conn = new Connection();
    conn.beginTransaction({ name: 'test-transaction', isolationLevel: 'READ_COMMITTED' }, function (err) {
      should.not.exist(err);
      conn.commitTransaction(function (err) {
        should.not.exist(err);
        done();
      });
    });
  });

  it('should return error on bad call to getting a transaction', { timeout: 10000 }, function (done) {
    var conn = new Connection();
    conn.pool.drain(function () {
      conn.beginTransaction(function (err) {
        should.exist(err);
        console.log(err);
        done();
      });
    });
  });
});
