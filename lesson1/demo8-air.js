// demo8-air.js
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var Class = function() {}
util.inherits(Class, EventEmitter);
Class.prototype.start = function() {
	this.emit("started", { status: "cold" });
};
module.exports = Class;