// demo9-1.js
fs.readFile("page.html", function(err, content) {
	if (err) {
		throw err;
	}
	getData(function(data) {
		applyDataToTheTemplate(content, data, function(resultedHTML) {
			renderPage(resultedHTML, function() {
				showPage(function() {
					// finally, we are done
				});
			});
		});
	});
});