var util = require("util");
var Engine = require("./engine.js");

console.log("ok");

var Class = function() {};

util.inherits(Class,Engine);

Class.prototype.left = function() {
	
	console.log("The car is moving to left.");

};
Class.prototype.right = function() {
	
	console.log("The car is moving to right.");

};

module.exports = Class;