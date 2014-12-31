// demo10-0.js
var connect = require("connect"),
	http = require("http");

var app = connect()
	.use(function(req, res, next) {
		console.log("That's my first middleware");
		next();
	})
	.use(function(req, res, next) {
		console.log("That's my second middleware");
		next();
	})
	.use(function() {
		console.log("end");
		res.end("Hello word");
	});

http.createServer(app).listen(3000);