var pools = require('./pools');
var tedious = require('tedious');

var Connection = function (options) {
  options = options || {};
  this.pool = pools.getPool(options.name);
};

Connection.ISOLATION_LEVELS = tedious.ISOLATION_LEVEL;

Connection.prototype.beginTransaction = function (options, cb) {
  if (typeof(options) === 'function') {
    cb = options;
    options = {};
  }
  var self = this;

  this.pool.getConnection(function (err, conn) {
    if (err) {
      cb(err);
    } else {
      self.conn = conn;
      var name = options.hasOwnProperty('name') ? options.name : null;
      var isolationLevel = options.hasOwnProperty('isolationLevel') ? Connection.ISOLATION_LEVELS[options.isolationLevel] : null;
      self.conn.beginTransaction(function (err) {
        cb(err);
      }, name, isolationLevel);
    }
  });
};

Connection.prototype.commitTransaction = function (cb) {
  var self = this;
  this.conn.commitTransaction(function (err) {
    if (err) {
      cb(err);
    } else {
      cb();
    }
    self.conn = null;
  });
};

module.exports = Connection;
