// demo9-2.js
var onFileRead = function(content) {
	getData(function(data) {
		applyDataToTheTemplate(content, data, dataApplied);
	});
}
var dataApplied = function(resultedHTML) {
	renderPage(resultedHTML, function() {
		showPage(weAreDone);
	});
}
var weAreDone = function() {
	// finally, we are done
}
fs.readFile("page.html", function(err, content) {
	if(err) throw err;
	onFileRead(content);
});