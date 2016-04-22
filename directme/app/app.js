angular.module("directMeApp", ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		// set states
		$stateProvider
			.state("home", {
				url: "/",
				templateUrl: "partials/directMe.html",
				controller: "directMeController"
			})
	});
