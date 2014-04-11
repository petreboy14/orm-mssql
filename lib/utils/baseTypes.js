var Joi = require('joi');
var SQLTypes = require('tedious').TYPES;

module.exports = function (TYPES) {
  TYPES = TYPES || SQLTypes;
  var map = {};
  var types = Object.keys(TYPES);

  types.forEach(function (type) {
    map[type] = {
      type: TYPES[type]
    };
    switch (type) {
    case 'Bit':
      map[type].validation = Joi.boolean();
      map[type].base = Boolean;
      break;
    case 'BitN':
      map[type].validation = Joi.boolean();
      map[type].base = Boolean;
      break;
    case 'TinyInt':
      map[type].validation = Joi.number().integer().min(0).max(255);
      map[type].base = Number;
      map[type].int = true;
      break;
    case 'SmallInt':
      map[type].validation = Joi.number().integer().min(-32768).max(32767);
      map[type].base = Number;
      map[type].int = true;
      break;
    case 'Int':
      map[type].validation = Joi.number().integer().min(-2147483648).max(2147483647);
      map[type].base = Number;
      map[type].int = true;
      break;
    case 'IntN':
      map[type].validation = Joi.number().integer().min(-2147483648).max(2147483647);
      map[type].base = Number;
      map[type].int = true;
      break;
    case 'BigInt':
      map[type].validation = Joi.string();
      map[type].base = Number;
      map[type].int = true;
      break;
    case 'Numeric':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'NumericN':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'SmallMoney':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'Money':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'MoneyN':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'Float':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'FloatN':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'Decimal':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'DecimalN':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'Real':
      map[type].validation = Joi.number();
      map[type].base = Number;
      map[type].int = false;
      break;
    case 'SmallDateTime':
      map[type].validation = Joi.date();
      map[type].base = Date;
      break;
    case 'DateTime':
      map[type].validation = Joi.date();
      map[type].base = Date;
      break;
    case 'DateTimeN':
      map[type].validation = Joi.date();
      map[type].base = Date;
      break;
    case 'DateN':
      map[type].validation = Joi.date();
      map[type].base = Date;
      break;
    case 'TimeN':
      map[type].validation = Joi.date();
      map[type].base = Date;
      break;
    case 'DateTime2N':
      map[type].validation = Joi.date();
      map[type].base = Date;
      break;
    case 'DateTimeOffsetN':
      map[type].validation = Joi.date();
      map[type].base = Date;
      break;
    case 'Char':
      map[type].validation = Joi.string().length(1);
      map[type].base = String;
      break;
    case 'VarChar':
      map[type].validation = Joi.string();
      map[type].base = String;
      break;
    case 'Text':
      map[type].validation = Joi.string();
      map[type].base = String;
      break;
    case 'NChar':
      map[type].validation = Joi.string().length(1);
      map[type].base = String;
      break;
    case 'NVarChar':
      map[type].validation = Joi.string();
      map[type].base = String;
      break;
    case 'NText':
      map[type].validation = Joi.string();
      map[type].base = String;
      break;
    case 'Binary':
      map[type].validation = Joi.string();
      map[type].base = Buffer;
      break;
    case 'VarBinary':
      map[type].validation = Joi.string();
      map[type].base = Buffer;
      break;
    case 'Null':
      map[type].validation = Joi.any().allow(null);
      map[type].base = null;
      break;
    case 'Image':
      map[type].validation = Joi.string();
      map[type].base = Buffer;
      break;
    case 'UDT':
      map[type].validation = Joi.string();
      map[type].base = String;
      break;
    case 'Xml':
      map[type].validation = Joi.string();
      map[type].base = String;
      break;
    case 'TVP':
      map[type].validation = Joi.string();
      map[type].base = String;
      break;
    case 'UniqueIdentifierN':
      map[type].validation = Joi.string().guid();
      map[type].base = String;
      break;
    default:
      throw new Error('no config for: ' + type);
    }

  });

  return map;
};
