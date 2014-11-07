var wheels = require("./wheels.js");
var Control = require("./control.js");

wheels.init("winter");
wheels.info();

var c = new Control();
c.forward();
c.right();
