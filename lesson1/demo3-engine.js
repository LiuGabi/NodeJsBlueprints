// demo3-engine.js
var Class = function() {
	// ...
};
Class.prototype = {
	forward: function() {
		console.log("The car is moving forward.");
	},
	backward: function() {
		console.log("The car is moving backward.");
	}
}
module.exports = Class;