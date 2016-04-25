/** Director
 * The director directive is an address search component.  It provides an address search,
 * and it provides a Google mapping component via the Mapper directive, and an address search history
 * via the Archiver directive.
 */
class Director {

	constructor() {
		this.restrict = "E";
		this.templateUrl = "../partials/director.html";
		this.controllerAs = "directorCtrl";
	}

	controller($scope) {
		// allow mapper child directive to regist its controller
		this.registerMapper = function (mapCtrl) {
			$scope.mapCtrl = mapCtrl;
		};
		// allow archiver child directive to register its controller
		this.registerArchiver = function (archiveCtrl) {
			$scope.archiveCtrl = archiveCtrl;
		};

		// TODO: should consider auto complete, not required, not implemented
		this.submit = (formCtrl) => {
			// in an earlier iteration, the address form had seaprate fields for addr,
			// city state, postal code.  However, the requirements did not specify the
			// type of addr form, and most user experience is with the single field
			// search, as in Google maps.
			this.handleAddressChange(this.address, false);
		};
		this.addressChanged = function (archive) {
			// this function is called as the result of an address history being selected
			this.handleAddressChange($scope.archiveCtrl.selectedAddress, true);
		};

		// the address change handler was a refactoring of common code, however, due to
		// other refactorings to solve problems, this function uses a boolean to fork
		// code flow.  As a result, this code should probably go back to the submit and
		// addressChanged functions where it would have more semantic value.
		this.handleAddressChange = (value, isValueKey) => {
			if (isValueKey) {
				let address = $scope.archiveCtrl.getAddressFromKey(value);
				$scope.mapCtrl.mapAddress(address.addr);
				$scope.archiveCtrl.saveAddress(address);
			} else {
				$scope.mapCtrl.mapAddress(value);
				$scope.archiveCtrl.saveAddress(value);
			}
		}
	}

}

angular.module("directMeApp")
	.directive("director", () => new Director());


