angular.module('loadMeApp')
	.controller("loadingController", ["$interval", "$state", function ($interval, $state) {
		var vm = this;
		vm.counter = 1;
		console.log("loadingController");

		// create interval timer for 3 second loading
		let stop = $interval(function () {
			vm.counter++;
			if (vm.counter > 3) {
				vm.stopLoading();
			}
		}, 1000);

		// $interval needs to be cleaned up when done
		vm.stopLoading = function () {
			$interval.cancel(stop);
			stop = undefined;
			$state.go("loaded");
		}
	}]);