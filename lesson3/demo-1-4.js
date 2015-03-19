angular.module('HeaderModele', [])
.filter('customuppercase', function() {
	return function(input) {
		if (input.length > 20) {
			return input.toUpperCase();
		} else {
			return input;
		}
	}
})
.controller('HeaderController', function($scope) {
	$scope.title = "Hello world";
	$scope.updateTitle = function() {
		$scope.title = "That's a new title.";
	}
});

angular.module('HeaderModele', [])
.factory("Data", function() {
	getTitle: function() {
		return "A better title.";
	}
})
.controller('HeaderController', function($scope, Data) {
	$scope.title = Data.getTitle();
	$scope.updateTitle = function() {
		$scope.title = "That's a new title.";
	}
});

"dependencies": {
	"mongodb": "1.3.20"
}

var crypto = require("crypto"),
	type = "mongodb",
	client = require('mongodb').MongoClient,
	mongodb_host = "127.0.0.1",
	mongodb_port = "27017",
	collection;

module.exports = function() {
	if (type == "mongodb") {
		return {
			add: function(data, callback) {},
			update: function(data, callback) {},
			get: function(callback) {},
			remove: function(id, callback) {}
		}
	} else {
		return {
			add: function(data, callback) {},
			update: function(data, callback) {},
			get: function(callback) {},
			remove: function(id, callback) {}
		}
	}
}

connection = 'mongodb://';
connection += mongodb_host + ':' + mongodb_port;
connection += '/blog-application';
client.connect(connection, function(err, database) {
	if (err) {
		throw new Error("Can't connect");
	} else {
		console.log("Connection to MongoDB server successful.");
		collection = database.collection('articles');
	}
});

return {
	add: function(data, callback) {
		var date = new Date();
		data.id = randomBytes(20).toString('hex');
		data.date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
		collection.insert(data, {}, callback || function(){});
	},
	update: function(data, callback) {
		collection.update(
			{ID: data.id},
			data,
			{},
			callback || function(){ }
		);
	},
	get: function(callback) {
		collection.find({}).toArray(callback);
	},
	remove: function(id, callback) {
		collection.findAndModify(
			{ID: id},
			[],
			{},
			{remove: true},
			callback
		);
	}
}

{
	title: "Blog post title",
	text: "Article's text here ..."
}