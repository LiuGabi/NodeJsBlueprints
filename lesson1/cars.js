var wheels = require("./wheels.js");
var Control = require("./control.js");

var AirConditioning = require("./air.js");
var air = new AirConditioning();
air.on("started",function(data) {
	console.log("Status: "+data.status);
});
air.start();

wheels.init("winter");
wheels.info();

var c = new Control();
c.forward();
c.right();
