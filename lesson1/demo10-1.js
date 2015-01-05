.use(function(req, res, next) {
	req.data = { value: "middleware" };
	next();
})
.use(function(req, res, next) {
	console.log(req.data, value);
});