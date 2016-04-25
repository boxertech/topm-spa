/**
 * GEOCODESERVICE
 * The GeoCodeService is a simple service to convert an address to a GeoCode object via the google.maps.Geocoder
 */
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
		});

		return deferred.promise;
	}
}

angular.module("directMeApp")
	.service("geoCodeService", GeoCodeService);
