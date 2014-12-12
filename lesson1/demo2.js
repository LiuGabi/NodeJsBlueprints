var http = require("http");

var getTime = function() {
	var d = new Date();
	return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" +d.getMilliseconds();
};
var respond = function(res, str) {
	res.writeHead(200, {"Content-Type":"text/plain"});
	res.end(str +"\n");
	console.log(str + " " + getTime());
};
var handleRequest = function(req, res) {
	if (req.url === "/favicon.ico") {
		return;
	}
	console.log("new request: " + req.url + "  - " + getTime());

	if (req.url == "/immediately") {
		respond(res, "A");
	} else {
		setTimeout(function() {
			// reading the file
			respond(res, "B");
		}, 5000);
	}

};

http.createServer(handleRequest).listen(88, "127.0.0.1");