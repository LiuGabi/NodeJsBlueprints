function HeaderController($scope) {
	$scope.title = "Hello world";
	$scope.updateTitle = function() {
		$scope.title = "That's a new title.";
	}
}