// demo9-4.js
var TwitterFeed = require("TwitterFeed");
TwitterFeed.on("loaded", function(err, data) {
	if(err) {
		// ...
	} else {
		// ...
	}
});
TwitterFeed.getData();