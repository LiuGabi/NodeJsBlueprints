// demo9.js
fs.readFile("page.html", function(err, content) {
	if (err) {
		throw err;
	}
	console.log(content);
});