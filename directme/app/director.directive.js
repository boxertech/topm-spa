class Director {

	constructor() {
		this.restrict = "E";
		this.templateUrl = "../partials/director.html";
		this.controllerAs = "directorCtrl";
		console.log("xtor test", this);
	}


	controller($scope) {
		this.register = function (mapCtrl) {
			console.log("registering: ", mapCtrl);
			$scope.mapCtrl = mapCtrl;
		};
		this.submit = function (formCtrl) {
			console.log("submit: ", this.address);
		};
	}

	link($scope) {
		console.log("director init: ", $scope);
		if (!$scope.mapCtrl) {
			console.log("no mapCtrl at link time");
		}
		$scope.mapCtrl.log("this message");
	}

}

angular.module("directMeApp")
	.directive("director", () => new Director());


