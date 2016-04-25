angular.module('loadMeApp')
	.controller("loadedController", ["$scope", "loadMeService", "$state",
		function ($scope, loadMeService, $state) {
		let vm = this;
		vm.submit = () => {
			console.log("submitted: ", this);
			loadMeService.saveContact(this.contact);
			$state.go('thanks');
		}

	}]);