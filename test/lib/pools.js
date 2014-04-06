var Lab = require('lab');
var should = require('should');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var pools = require('../../lib/pools');
var config = require('../../.test-config');

describe('pools tests', function () {
  it('should be able to initialize a pool with a valid configuration', function (done) {
    pools.init(config);
    done();
  });

  it('should be able to get a pool', function (done) {
    var pool = pools.getPool();
    should.exist(pool);
    pool.getConnection.should.be.an.instanceOf(Function);
    done();
  });

  it('should be able to init a pool by name', function (done) {
    config.name = 'test';
    pools.init(config);
    done();
  });

  it('should be able to get a pool by name', function (done) {
    var pool = pools.getPool('test');
    should.exist(pool);
    pool.getConnection.should.be.an.instanceOf(Function);
    done();
  });

  it('should be able to make a pool without a pool config', function (done) {
    delete(config.pool);
    pools.init(config);
    done();
  });

  it('should be able to get a connection from a pool', function (done) {
    var pool = pools.getPool();
    pool.getConnection(function (err, conn) {
      should.not.exist(err);
      should.exist(conn);
      done();
    });
  });
});
