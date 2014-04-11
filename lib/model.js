var Column = require('./column');

var Model = function (schema, options) {
  this.schema = this._generateSchema(schema);
};

Model.prototype._generateSchema = function (schema) {
  var _schema = {};
  for (var item in schema) {
    schema[item] = new Column(schema[item]);
  }
  return _schema;
};

module.exports = Model;
