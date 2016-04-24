
class Archiver {

	constructor() {
		this.restrict = "E";
		this.require = "^director";
		// normally I would used external html files for templates using the templateUrl property, and
		// the build process would inject the templates into templateCache using something like html2js.
		// However, without that build step, the templateUrl is loaded aync, which suspends the child directives
		// compile and link steps until the template is retrieved. This disrupts the compile down, link up execution
		// order. Therefore, I am putting the template in the .js file here to assure the child directive link function
		// executes before the parent link function.
		// TODO: templates to templateCache
		this.template = "<!--<div ng-show=\"archiverCtrl.hasAddresses\" class=\"archive-trigger\" ng-click=\"archiverCtrl.showHistory()\">Address History<span class=\"glyphicon glyphicon-triangle-bottom\"></span></div>--><select class=\"archive-list\" ng-show=\"archiverCtrl.hasAddresses\" ng-change=\"archiverCtrl.addressChanged()\" ng-model=\"archiverCtrl.selectedAddress\" name=\"address\"><option value=\"\">Address History</option><option ng-repeat=\"address in archiverCtrl.addresses\" value=\"{{address}}\">{{address}}</option></select>";

		this.controllerAs = "archiverCtrl";
	}

	controller($window) {
		this.$window = $window;

		this.saveAddress = function (address) {
			console.log("asveAddress: ", this.addresses, address, $window, $window.localStorage);
			if (!this.addresses || this.addresses.length === 0) {
				// try to get addresses from localStorage
				console.log("trying to get addresses");
				this.addresses = this.getAddresses() || [];
			}

			if (this.addresses && this.addresses.length >= 20) {
				this.addresses.shift();
			}

			this.addresses.push(address);
			this.hasAddresses = true;
			let newAddrs = JSON.stringify(this.addresses);
			console.log("archiver.saveAddress: ", newAddrs, address, this.addresses, this);
			// TODO:  this does not work, it shows local stoarage working correctly via Javascript, but Chrome was converting values to null
			if (this.$window.localStorage) {
				this.$window.localStorage.setItem("archiverAddresses", JSON.stringify(this.addresses));
			}
			console.log("storage after save: ", this.getAddresses());
			return;
		};

		this.getAddresses = () => {
			let addrs;
			if (this.$window.localStorage) {
				addrs = this.$window.localStorage.getItem("archiverAddresses");
			}
			if (addrs === "undefined") {
				addrs = undefined;
			}
			console.log("getting addresses - preParse: ", addrs, !addrs, Array.isArray(addrs));
			addrs = (!addrs || Array.isArray(addrs)) ? addrs : JSON.parse(addrs);
			this.hasAddresses = !!addrs && addrs.length > 0;
			console.log("getting addresses: ", addrs, this.hasAddresses);
			return addrs;
		};
		this.addressChanged = () => {
			if (!this.selectedAddress) {
				console.log("address change fired, but not this.selectedAddress: ", this);
			}

		}

		// init
		this.addresses = this.getAddresses() || [];

	}

	link($scope, $elem, $attr, directorCtrl) {
		console.log("archiver archivelink", this, $scope, directorCtrl);

		directorCtrl.registerArchiver($scope.archiverCtrl);

		let trigger = $elem.find("div");
		trigger.on("click", showHistory);
		let history = $elem.find("select");
		history.on("change", addressChanged);

		function showHistory() {
			history.removeClass("hidden");
		}
		function addressChanged() {
			console.log("addressChanged", $scope);
			directorCtrl.addressChanged();
		}
	}


}

angular.module("directMeApp")
	.directive("archiver", ["$window", ($window) => new Archiver($window)]);


