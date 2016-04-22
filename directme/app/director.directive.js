angular.module("directMeApp")
	.directive("director", function () {
		return {
			restrict: "E",
			templateUrl: "../partials/director.html",
			controller: directorController
		};

		function directorController() {

		}
	});

