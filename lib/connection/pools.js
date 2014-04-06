var ConnectionPool = require('tedious-connection-pool');

var pools = {};
var pool = null;

var Pool = function (options) {
  var poolConfig = options.pool || {};
  var connectionConfig = options.connection || {};

  this.pool = new ConnectionPool(poolConfig, connectionConfig);
};

Pool.prototype.getConnection = function (cb) {
  var self = this;
  this.pool.requestConnection(function (err, conn) {
    cb(err, conn);
  });
};

exports.init = function (options) {
  var newPool = new Pool(options);

  if (options.hasOwnProperty('name')) {
    pools[options.name] = newPool;
  } else {
    pool = newPool;
  }
};

exports.getPool = function (name) {
  if (name) {
    return pools[name];
  } else {
    return pool;
  }
};
