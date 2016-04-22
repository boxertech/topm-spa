angular.module("loadMeApp", ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		// set states
		$stateProvider
			.state("loaded", {
				url: "/loaded",
				templateUrl: "partials/loaded.html",
				controller: "loadedController",
				controllerAs: 'loaded'
			})
			.state("loading", {
				url: "/",
				templateUrl: "partials/loading.html",
				controller: "loadingController"
			})
			.state("thanks", {
				url: "/thanks",
				templateUrl: "partials/thanks.html",
				controller: "thanksController",
				controllerAs: "thanks"
			});
	});
