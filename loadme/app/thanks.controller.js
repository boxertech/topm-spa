angular.module('loadMeApp')
	.controller("thanksController", ["loadMeService",
		function (loadMeService) {
			let vm = this;
			vm.contact = loadMeService.getContact();
			console.log("thanks: ", this);

		// TODO: need to add form validation messages
	}]);