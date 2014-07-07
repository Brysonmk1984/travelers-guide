var travelersApp = angular.module('travelersApp', []);
travelersApp.controller('WeatherCtrl',['$scope', '$http', function($scope, $http){
		$scope.weatherHeadline = "The weather today will be:";
		$scope.weather;
		$scope.currentLocation;
		$scope.city;
		$scope.state;
		$scope.country;
		$scope.handleWeatherData = function(weatherData){
			$scope.weather = weatherData.data.weather[0];
			//console.log(weatherData.data.weather[0]);

		};
		var locationObject = {};
		var findMyLocation = function(){
			function geoSuccess(p) {
				locationObject = {
					lat : p.coords.latitude,
					lng : p.coords.longitude
				};
				
				function initializeMap() {
				   
					var mapOptions = {
					   center: new google.maps.LatLng(locationObject.lat, locationObject.lng),
					   zoom: 12
					};
					var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
					geocoder = new google.maps.Geocoder();
				 }
				initializeMap(); 

				function codeLatLng(lat, lng) {
					var latlng = new google.maps.LatLng(lat, lng);
					geocoder.geocode({'latLng': latlng}, function(results, status) {
						$scope.$apply( function () {
							  if (status == google.maps.GeocoderStatus.OK) {
								if (results[1]) {
									console.log(results[1]);
									$scope.currentLocation = results[1].formatted_address;
									$scope.city = results[1].address_components[1].long_name;
									$scope.state = results[1].address_components[2].short_name;
									$scope.country = results[1].address_components[3].short_name;



								} else {
								  alert("No results found");
								}
							  } else {
								alert("Geocoder failed due to: " + status);
							  }
						});
					});
				}
				
					$scope.weatherResults = codeLatLng(locationObject.lat, locationObject.lng);
	
				$scope.weather = $http.get("http://api.worldweatheronline.com/free/v1/weather.ashx?key=4ba34577dab3de03fbe0b53eade625dea3ce8cdf&format=json&q="+locationObject.lat+","+locationObject.lng)
				.success($scope.handleWeatherData);
			}
			function geoError(p) {
			  alert("can't get location");
			}
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
		};
		findMyLocation();


	}
]);



	