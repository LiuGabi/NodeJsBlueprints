// demo7-control.js
var util = require("util");
var Engine = require("./demo3-engine.js");
var Class = function() {}
util.inherits(Class, Engine);
Class.prototype.left = function() {
	console.log("The car is moving to left.");
};
Class.prototype.right = function() {
	console.log("The car is moving to right");
};
module.exports = Class;