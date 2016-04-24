class GeoCodeService {
	constructor($q) {
		this.$q = $q;
		this.geoCoder = new google.maps.Geocoder();

	}

	getGeoCode(address) {
		let deferred = this.$q.defer();

		this.geoCoder.geocode({ address: address }, function (results, status) {
			//handle reply
			deferred.resolve(results);
			console.log("geocoder: ", results[0].geometry.location, status);
			// newCenter.latitude = results[0].geometry.location.lat();
			// newCenter.latitude = results[0].geometry.location.lng();
		});

		return deferred.promise;
	}
}

angular.module("directMeApp")
	.service("geoCodeService", GeoCodeService); // , ["geoCodeService", "$q", (geoCodeService, $q) => new GeoCodeService($q)]);
