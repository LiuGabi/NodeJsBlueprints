var wheels = require("./wheels.js")();
var control = require("./control.js")();
var airConditioning = require("./air.js")();

module.export = {
	run: function() {
		wheels.init();
		control.forward();
		airConditioning.start();
	}
};