// demo8-car.js
var AirConditioning = require("./demo8-air.js");
var air = new AirConditioning();
air.on("started", function(data) {
	console.log("Status: " + data.status);
});
air.start();