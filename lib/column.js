var Joi = require('joi');

var BASE_TYPES = require('./utils/baseTypes')();

var Column = function (options) {
  if (!options || !options.type) {
    throw new Error('A type must be specified for column');
  } else if (!options.type.type || !options.type.type.name || !BASE_TYPES[options.type.type.name]) {
    throw new Error('The given type ' + options.type + ' is not registered');
  } else {
    this.options = options;
    this.type = this.options.type;
    this.validation = this._setupValidation();
  }
};

Column.TYPES = BASE_TYPES;

Column.prototype._setupValidation = function () {
  var validation = this.type.validation;

  switch (this.type.base) {
  case String:
    validation = this._setupStringValidations(validation);
    break;
  case Number:
    validation = this._setupNumberValidations(validation);
    break;
  case Date:
    validation = this._setupDateValidations(validation);
    break;
  }
  return validation;
};


Column.prototype._setupStringValidations = function (validation) {
  if (this.options.hasOwnProperty('minLength')) {
    validation = validation.min(this.options.minLength);
    delete(this.options.minLength);
  }

  if (this.options.hasOwnProperty('maxLength')) {
    validation = validation.max(this.options.maxLength);
    delete(this.options.maxLength);
  }

  if (this.options.hasOwnProperty('length')) {
    validation = validation.max(this.options.length);
    delete(this.options.length);
  }

  if (this.options.hasOwnProperty('regex')) {
    validation = validation.regex(this.options.regex);
    delete(this.options.regex);
  }

  if (this.options.alphanum) {
    validation = validation.alphanum();
    delete(this.options.alphanum);
  }

  if (this.options.token) {
    validation = validation.token();
    delete(this.options.token);
  }

  if (this.options.email) {
    validation = validation.email();
    delete(this.options.email);
  }

  if (this.options.isoDate) {
    validation = validation.isoDate();
    delete(this.options.isoDate);
  }

  return validation;
};

Column.prototype._setupNumberValidations = function (validation) {
  var modified = false;

  if (this.options.hasOwnProperty('min')) {
    modified = true;
    if (this.type.int) {
      validation = Joi.number().integer().min(this.options.min);
    } else {
      validation = Joi.number().min(this.options.min);
    }
    delete(this.options.min);
  }

  if (this.options.hasOwnProperty('max')) {
    if (modified) {
      validation = validation.max(this.options.max);
    } else if (this.type.int) {
      validation = Joi.number().integer().max(this.options.max);
    } else {
      validation = Joi.number().max(this.options.max);
    }
    delete(this.options.max);
  }

  return validation;
};

Column.prototype._setupDateValidations = function (validation) {
  if (this.options.hasOwnProperty('min')) {
    validation = validation.min(this.options.min);
    delete(this.options.min);
  }

  if (this.options.hasOwnProperty('max')) {
    validation = validation.max(this.options.max);
    delete(this.options.max);
  }

  return validation;
};

module.exports = Column;
