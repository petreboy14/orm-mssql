var Joi = require('joi');
var tedious = require('tedious');

var Column = require('./column');
var ColumnTypes = Column.TYPES;

var properColumn = Joi.object({
  type: Joi.any().valid(Object.keys(ColumnTypes)).required(),
  min: Joi.number().integer().optional(),
  max: Joi.number().integer().optional(),
  defaultVal: Joi.any().optional(),
  notNull: Joi.boolean().optional(),
  enum: Joi.array().min(1).optional(),
  minLength: Joi.number().integer().optional(),
  maxLength: Joi.number().integer().optional(),
  length: Joi.number().integer().optional(),
  regex: Joi.string().optional(),
  alphanum: Joi.boolean().optional(),
  token: Joi.boolean().optional(),
  email: Joi.boolean().optional(),
  isoDate: Joi.boolean().optional()
});

var Schema = function (schema, options) {
  this._schema = {};
  this._validateSchema(schema);

  this.options = options;
};

Schema.Types = (function () {
  var types = {};
  var columnTypes = Object.keys(ColumnTypes);
  columnTypes.forEach(function (type) {
    types[type] = type;
  });
  return types;
})();

Schema.prototype._validateSchema = function (schema) {
  var errors = [];
  for (var item in schema) {
    var err = Joi.validate(schema[item], properColumn);
    if (err) {
      errors.push(err);
    } else {
      schema[item] = ColumnTypes[schema[item]];
    }
  }

  if (errors.length > 0) {
    throw new Error(errors);
  }
};

module.exports = Schema;
