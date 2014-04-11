var Joi = require('joi');
var TYPES = require('tedious').TYPES;

var BASE_MAPPINGS = (function () {
  var map = {};
  var types = Object.keys(TYPES);
  types.forEach(function (type) {
    switch (type) {
    case 'Bit':
      map.Bit = Joi.boolean();
      break;
    case 'TinyInt':
      map.TinyInt = Joi.number().integer().min(0).max(255);
      break;
    case 'SmallInt':
      map.SmallInt = Joi.number().integer().min(-32768).max(32767);
      break;
    case 'Int':
      map.Int = Joi.number().integer().min(-2147483648).max(2147483647);
      break;
    case 'BigInt':
      map.BigInt = Joi.string();
      break;
    case 'Numeric':
      map.Numeric = Joi.number();
      break;
    case 'SmallMoney':
      map.SmallMoney = Joi.number();
      break;
    case 'Money':
      map.Money = Joi.number();
      break;
    case 'Float':
      map.Float = Joi.number();
      break;
    case 'Real':
      map.Real = Joi.number();
      break;
    case 'SmallDateTime':
      map.SmallDateTime = Joi.alternatives(Joi.date(), Joi.string.isoDate());
      break;
    case 'DateTime':
      map.DateTime = Joi.alternatives(Joi.date(), Joi.string.isoDate());
      break;
    case 'DateTime2':
      map.DateTime2 = Joi.alternatives(Joi.date(), Joi.string.isoDate());
      break;
    case 'DateTimeOffset':
      map.DateTimeOffset = Joi.alternatives(Joi.date(), Joi.string.isoDate());
      break;
    case 'Time':
      map.Time = Joi.alternatives(Joi.date(), Joi.string.isoDate());
      break;
    case 'Char':
      map.Char = Joi.string().length(1);
      break;
    case 'VarChar':
      map.NVarChar = Joi.string();
      break;
    case 'Text':
      map.Text = Joi.string();
      break;
    case 'NChar':
      map.NChar = Joi.string().length(1);
      break;
    case 'NVarChar':
      map.NVarChar = Joi.string();
      break;
    case 'NText':
      map.NText = Joi.string().length(1);
      break;
    case 'Binary':
      map.NText = Joi.string().length(1);
      break;
    }
  });
})();

var Column = function (type, options) {
  this.type = options.type;
  this.options = options;
};

Column.prototype.getValidations = function () {

};

module.exports = Column;
