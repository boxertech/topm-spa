
class Mapper {

	constructor() {
		this.restrict = "E";
		this.require = "^director";
		// normally I would used external html files for templates using the templateUrl property, and
		// the build process would inject the templates into templateCache using something like html2js.
		// However, without that build step, the templateUrl is loaded aync, which suspends the child directives
		// compile and link steps until the template is retrieved. This disrupts the compile down, link up execution
		// order. Therefore, I am putting the template in the .js file here to assure the child directive link function
		// executes before the parent link function.
		this.template = "<div class=\"map-container\"><div>center={{mapperCtrl.map.center.latitude}},{{mapperCtrl.map.center.longitude}}, zoom={{mapperCtrl.map.zoom}}</div><ui-gmap-google-map center=\"mapperCtrl.map.center\" zoom=\"mapperCtrl.map.zoom\"></ui-gmap-google-map></div>"; //"../partials/mapper.html";
		this.controllerAs = "mapperCtrl";
	}

	controller($scope) {
		this.log = function (message) {
			console.log("mapper.log: ", message);
		};
		this.map = {
			center: {
				latitude: 36.16710936,
				longitude: -79.69720204
			},
			zoom: 6
		};
		// AIzaSyDrjyb-xCq7vMVMWX2ZjdI7JZYAQnEhuAs
	}

	link($scope, $elem, $attr, directorCtrl) {
		console.log("mapper link");
		directorCtrl.register($scope.mapperCtrl);
	}

}

angular.module("directMeApp")
	.directive("mapper", () => new Mapper());


