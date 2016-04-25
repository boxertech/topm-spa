/**
 * MAPPER
 * The mapper directive provides the interaction with the Google mapping API
 */
class Mapper {

	constructor() {
		this.restrict = "E";
		this.require = "^director";
		// normally I would used external html files for templates using the templateUrl property, and
		// the build process would inject the templates into templateCache using something like html2js.
		//
		// However, without that build step, the templateUrl is loaded aync, which suspends the child directives
		// compile and link steps until the template is retrieved. This disrupts the compile down, link up execution
		// order. Therefore, I am putting the template in the .js file here to assure the child directive link function
		// executes before the parent link function.
		this.template = "<div class=\"map-container\"><ui-gmap-google-map center=\"mapperCtrl.map.center\" zoom=\"mapperCtrl.map.zoom\"></ui-gmap-google-map></div>"; //"../partials/mapper.html";
		this.controllerAs = "mapperCtrl";
	}

	controller(geoCodeService) {
		this.geoCodeService = geoCodeService;

		// mapAddress takes an address string, gets teh geo code via the goeCodeService.
		// The geoCode object is used to set the lat, lng, and zoom.  This causes the <ui-gmap-google-map
		// directive to redraw.
		this.mapAddress = function (address) {
			this.geoCodeService.getGeoCode(address)
				.then((results) => {
					console.log("geocode results: ", results[0].geometry);
					this.map.center = {
						latitude: results[0].geometry.location.lat(),
						longitude: results[0].geometry.location.lng()
					};
					this.map.zoom = 11;
				})
				.catch((status) => {
					console.log("geocode failed: ", status);
				});
		};

		// arbitrary map start position, roughly Greensboro, NC
		this.map = {
			center: {
				latitude: 36.16710936,
				longitude: -79.69720204
			},
			zoom: 6
		};
	}

	link($scope, $elem, $attr, directorCtrl) {
		console.log("mapper link", this, $scope, directorCtrl);
		directorCtrl.registerMapper($scope.mapperCtrl);
	}


}

angular.module("directMeApp")
	.directive("mapper", ["geoCodeService", (geoCodeService) => new Mapper(geoCodeService)]);


