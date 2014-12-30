// demo9-6.js
var TwitterFeed = require("TwitterFeed");
var Database = require("Database");
var promise = TwitterFeed.getData();
promise.then(function(data) {
	var promise = Database.save(data);
	return promise;
}).then(function() {
	// the data is saved
	// into the database
}).catch(function(err) {
	// ...
});