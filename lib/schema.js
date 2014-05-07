var Joi = require('joi');
var tedious = require('tedious');

var Column = require('./column');
var ColumnTypes = Column.TYPES;
var Model = require('./model');

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

var properOptions = Joi.object({
  name: Joi.string().min(1).max(128).required(),
  db: Joi.string().min(1).max(128).optional()
});

var Schema = function (schema, options) {
  options = options || {};
  this._validateSchema(schema);
  this._validateOptions(options);
  this.options = options;
  this.schema = schema;
  console.log(schema);
};

Schema.Types = (function () {
  var types = {};
  var columnTypes = Object.keys(ColumnTypes);
  columnTypes.forEach(function (type) {
    types[type] = type;
  });
  return types;
})();

Schema.prototype.Model = function (data) {
  return new Model(this, data);
};

Schema.prototype._validateSchema = function (schema) {
  var errors = [];
  for (var item in schema) {
    var err = Joi.validate(schema[item], properColumn);
    if (err) {
      errors.push(err);
    } else {
      schema[item].type = ColumnTypes[schema[item].type];
      schema[item] = new Column(schema[item]);
    }
  }

  if (errors.length > 0) {
    throw new Error(errors);
  }
};

Schema.prototype._validateOptions = function (options) {
  var errors = Joi.validate(options, properOptions);
  if (errors) {
    throw errors;
  }
};

module.exports = Schema;
