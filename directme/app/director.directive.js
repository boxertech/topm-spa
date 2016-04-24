class Director {

	constructor() {
		this.restrict = "E";
		this.templateUrl = "../partials/director.html";
		this.controllerAs = "directorCtrl";
		console.log("xtor test", this);
	}


	controller($scope) {
		this.registerMapper = function (mapCtrl) {
			console.log("registering mapper: ", mapCtrl);
			$scope.mapCtrl = mapCtrl;
		};
		this.registerArchiver = function (archiveCtrl) {
			console.log("registering archiver: ", archiveCtrl);
			$scope.archiveCtrl = archiveCtrl;
		};
		// TODO: Need auto complete
		this.submit = (formCtrl) => {
			console.log("director.submit");
			this.handleAddressChange(this.address, true);
			// $scope.mapCtrl.mapAddress(this.address);
			// $scope.archiveCtrl.saveAddress(this.address);
		};
		this.addressChanged = function (archive) {
			this.handleAddressChange($scope.archiveCtrl.selectedAddress, false);
		};
		this.handleAddressChange = (address, archive) => {
			console.log("director.handleAddressChange: ", archive, address);
			$scope.mapCtrl.mapAddress(address);
			if (archive) {
				$scope.archiveCtrl.saveAddress(this.address);
			}
		}
	}

	// link($scope) {
	// }

}

angular.module("directMeApp")
	.directive("director", () => new Director());


