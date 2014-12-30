// demo9-5.js
var TwitterFeed = require("TwitterFeed");
var promise = TwitterFeed.getData();
promise.then(function(data) {
	// ...
}, function(err) {
	// ...
});