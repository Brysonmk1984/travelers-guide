var travelersApp = angular.module('travelersApp', []);

/*travelersApp.factory('weatherFactory', function($http){
	var factory = {};
	factory.getWeatherData = function(){	
	};
	return factory.getWeatherData();
});*/

travelersApp.controller('WeatherCtrl',['$scope', '$http', function($scope, $http){

		$scope.weatherHeadline = "The weather today will be:";
		$scope.weather;
		$scope.handleWeatherData = function(weatherData){
			$scope.weather = weatherData.data.weather[0];
			console.log(weatherData.data.weather[0]);

		};
		var locationObject = {};
		var findMyLocation = function(){
			function geoSuccess(p) {
			  console.log("Found you at latitude " + p.coords.latitude +
			        ", longitude " + p.coords.longitude);
				locationObject = {
					lat : p.coords.latitude,
					lon : p.coords.longitude
				};



				function initialize() {
				  var mapOptions = {
				    center: new google.maps.LatLng(locationObject.lat, locationObject.lon),
				    zoom: 12
				  };
				  var map = new google.maps.Map(document.getElementById("map-canvas"),
				      mapOptions);
				}
				initialize();


				/*geocoder.geocode({'latLng': latlng}, function(results, status) {
				   if (status == google.maps.GeocoderStatus.OK) {
				     if (results[1]) {
				       map.setZoom(11);
				       marker = new google.maps.Marker({
				           position: latlng,
				           map: map
				       });
				       infowindow.setContent(results[1].formatted_address);
				       infowindow.open(map, marker);
				     } else {
				       alert('No results found');
				     }
				   } else {
				     alert('Geocoder failed due to: ' + status);
				   }
				 });*/



				$scope.weather = $http.get("http://api.worldweatheronline.com/free/v1/weather.ashx?key=4ba34577dab3de03fbe0b53eade625dea3ce8cdf&format=json&q="+locationObject.lat+","+locationObject.lon)
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



	