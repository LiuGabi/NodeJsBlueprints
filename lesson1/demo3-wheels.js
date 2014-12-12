// demo3-wheels.js
var typeOfTires;
exports.init = function(type) {
	typeOfTires = type;
}
exports.info = function() {
	console.log("The car uses " + typeOfTires + " tires.");
}