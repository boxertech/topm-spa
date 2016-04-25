/**
 * ARCHIVER
 * The archiver directive stores and retrieves addresses from localStorage.  The addresses are used to populate
 * an Address History dropdown.  The address history dropdown only appears if there are addresses to show in
 * the dropdown.  The dropdown and localStorage have been given an arbitrary limit of 20 addresses.  However,
 * it seems like there should be some effective limit for UX purposes.  This directive also sorts the dropdown
 * list by last used date, so the most recently accessed address is on top.  When the list exceeds 20 addresses
 * this sorting assures the address with the oldest last access date is removed.
 *
 * These features are arguably better provided in a service, but the requirements specified a directive. Also, this is something that would be a candidate for an open source angular module.  There is a balance between using modules that can help get the work done quickly and adding too much bloat to a client-side application.  Reading and writing to localStorage is fairly light weight, but depending on browser support requirements, the edge cases and fallback features could warrant adding a module.
 *
 * Note about archiver:  I spent more time on this app than I planned.  I originally planned to keep the addresses
 * in an array of strings.  Archiver would then store that array (stringified) in local storage.  This worked to an
 * extent.  Archiver could manage the array, store the array in localstorage, and then pull the array back out
 * of localstorage to confirm all was well. However, on reload, only the first address was retained.  The other
 * addresses were stored as nulls.  Watching the resource tab in Chrome dev tools, I could see the addresses being
 * written to localStorage. However, immediately the addresses after the first address were converted to one or
 * more nulls.  I spent several hours trying to resolve how I was formating the string and how I was referencing
 * localstorage. I reviewed other angular libraries to see how they were acessing localStorage, and they were
 * reading and writing as I was.
 *
 * Borrowing and idea (not code) from angular-local-storage, I decided to store the addresses in seaprate keys in
 * localStorage.  This resulted in a more complex directive.  However, now that the work is done, it is probably
 * a more extensible solution.
 */
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
		this.template = "<select class=\"archive-list\" ng-show=\"archiverCtrl.hasAddresses\" ng-change=\"archiverCtrl.addressChanged()\" ng-model=\"archiverCtrl.selectedAddress\" name=\"address\"><option value=\"\">Address History</option><option ng-repeat=\"address in archiverCtrl.addresses\" value=\"{{address.key}}\">{{address.addr}}</option></select>";

		this.controllerAs = "archiverCtrl";
	}

	controller($window) {
		this.$window = $window;
		this.localStorageSupported = ('localStorage' in $window && $window['localStorage']);
		this.addrPrefix = "addr_"; // used to prefix keys.

		// Saves address to localStorage, adds it to local collection or updates date, and pops address if needed
		this.saveAddress = function (address) {
			console.log("asveAddress: ", this.addresses, address, $window, $window.localStorage);

			if (!this.addresses || this.addresses.length === 0) {
				this.addresses = [];
			}

			// address coming in maybe string (new) or object (reuse)
			let saveAddress;
			if (typeof address === 'string' || address instanceof String) {
				saveAddress = {
					addr: address,
					lastDate: new Date(),
					key: this.addrPrefix + generateKey()
				};
			} else {
				saveAddress = address;
				saveAddress.lastDate = new Date();
			}

			// simple generator courtesy os Stackoverflow (http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js)
			function generateKey() {
				return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
			}

			// does the addr to be saved already exist in the list
			let addrFound = false;
			for (let i = 0; i < this.addresses.length; i++) {
				if (this.addresses[i].key === saveAddress.key) {
					this.addresses[i] = saveAddress;
					addrFound = true;
					i = this.addresses.length;
				}
			}
			if (!addrFound) {
				this.addresses.push(saveAddress);
			}

			if (this.localStorageSupported) {
				this.$window.localStorage.setItem(saveAddress.key, angular.toJson(saveAddress));
			}

			// sort addresses based on last date
			this.addresses = this.sortAddresses(this.addresses);

			let popAddress;
			if (this.addresses.length > 20) {
				popAddress = this.addresses.pop();
				if (this.localStorageSupported) {
					this.$window.localStorage.removeItem(popAddress.key);
				}
			}

			this.hasAddresses = true;

			return;
		};

		// get address from localStorage.  Called on directive start-up
		this.getAddresses = (keys) => {
			let addrs = [];

			if (!keys || keys.length === 0) {
				return null;
			}
			if (!this.localStorageSupported) {
				return null;
			}

			keys.forEach((key) => {
				let addr = this.getAddressFromKey(key);
				addrs.push(addr);
			});

			// sort address array by last date
			addrs = this.sortAddresses(addrs);

			this.hasAddresses = addrs.length > 0;
			console.log("getting addresses: ", addrs, this.hasAddresses);
			return addrs;
		};

		// gets a single address for localStorage with a given key
		this.getAddressFromKey = (key) => {
			if (!key || key.substr(0, this.addrPrefix.length) !== this.addrPrefix) {
				return null;
			}
			if (!this.localStorageSupported) {
				return null;
			}
			let rawAddr = this.$window.localStorage.getItem(key);
			let addr = null;
			if (rawAddr && rawAddr !== "undefined") {
				addr = angular.fromJson(rawAddr);
			}

			return addr;
		};

		// sorts addresses by lastDate used, with most recently accessed on top.
		this.sortAddresses = (addrs) => {
			// sort address array by last date
			console.log("sorting Addresses: ", addrs);
			return addrs.sort(dateComparer);

			function dateComparer(a, b) {
				a.lastDate = Object.prototype.toString.call(a.lastDate) === "[object Date]" ? a.lastDate : new Date(a.lastDate);
				b.lastDate = Object.prototype.toString.call(b.lastDate) === "[object Date]" ? b.lastDate : new Date(b.lastDate);
				if (a.lastDate < b.lastDate) {
					return 1;
				}
				if (a.lastDate > b.lastDate) {
					return -1;
				}
				return 0;
			}
		};

		// TODO: this function is no longer called - I think.  Left here to avoid regression errors at deadline
		this.addressChanged = () => {
			if (!this.selectedAddress) {
				console.log("address change fired, but not this.selectedAddress: ", this);
			}

		}

		// returns keys in local storage matching prefix defined in controller
		this.getLocalStorageKeys = () => {
			if (!this.localStorageSupported) {
				return null;
			}

			console.log("getStorageKeys: ", this.$window.localStorage, Object.keys(this.$window.localStorage));
			let keys = Object.keys(this.$window.localStorage);
			return keys.filter((key) => {
				return key.substr(0, this.addrPrefix.length) === this.addrPrefix;
			});
		};

		// initialize directive
		this.addrKeys = this.getLocalStorageKeys() || [];
		this.addresses = this.getAddresses(this.addrKeys) || [];

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
		function addressChanged(e) {
			console.log("addressChanged", $scope, e);
			directorCtrl.addressChanged();
		}
	}


}

angular.module("directMeApp")
	.directive("archiver", ["$window", ($window) => new Archiver($window)]);


