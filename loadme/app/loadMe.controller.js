angular.module('loadMeApp')
	.controller("loadMeController", ["$interval", "$state", function ($interval, $state) {
		var vm = this;
		vm.counter = 1;

		// create interval timer for 3 second loading
		var stop = $interval(function () {
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