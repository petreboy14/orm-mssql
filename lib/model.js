'use strict';

var Model = function (parent, data) {
  this.values = {};
  this.columns = {};
  this.parent = parent;
  this._setValues(data);
};

Model.prototype.toJSON = function () {

};

Model.prototype.set = function (col, val) {

};

Model.prototype.get = function (col) {

};

Model.prototype.save = function () {

};

Model.prototype._setValues = function (data) {
  for (var item in data) {
    //this.parent.schema[item].validate
    console.log(item);
  }
};

module.exports = Model;
