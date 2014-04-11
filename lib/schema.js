var Joi = require('joi');
var tedious = require('tedious');

var TYPES = Object.keys(tedious.TYPES);

var properSchema = Joi.object({
  type: Joi.string().allow(TYPES).required(),
  default: Joi.any().optional(),

});

var Schema = function (schema, options) {
  this.schema = schema;
  this.options = options;
};

Schema.prototype._validateSchema = function () {
  var schemaValid = properSchema.validate(this.schema);
  
  return (schemaValid === null) ? true : schemaValid;
};

module.exports = Schema;
