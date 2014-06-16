// $(document).ready(function(){
// 	var show_map = function(position){
// 		var lat = position.coords.latitude;
// 		var lon = position.coords.longitude;
// 		console.log(lat);console.log(lon);
// 		$.get("http://api.worldweatheronline.com/free/v1/weather.ashx?key=4ba34577dab3de03fbe0b53eade625dea3ce8cdf&format=json&q="+lat+","+lon, function(data){
			
// 		for(item in data.data.weather[0]){
// 			var key = item;
// 			var value = data.data.weather[0][item];
// 			$("#weatherList").append("<li>"+item +":"+value+"</li>");
// 		}
			
// 		});
// 	};
// 	var get_location = function() {
// 	  navigator.geolocation.getCurrentPosition(show_map);
// 	};
// 	get_location();



// });

var travelersApp = angular.module('travelersApp', []);

travelersApp.factory('weatherFactory', function($http){
	var factory = {};

	factory.findLocation = function(){
		var locationObject = {};
		var myLatLon = function(position){
			return {
				lat : position.coords.latitude,
				lon : position.coords.longitude
			}
		};
		function geoSuccess(p) {
		  alert("Found you at latitude " + p.coords.latitude +
		        ", longitude " + p.coords.longitude);
			locationObject = {
				lat : p.coords.latitude,
				lon : p.coords.longitude
			}
		}
		function geoError(p) {
		  alert("can't get location");
		}
		
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

		return {
			lat : 40,
			lon : -105
		}
	};

	factory.getWeatherData = function(){
		var myLocation = factory.findLocation();
		return $http.get("http://api.worldweatheronline.com/free/v1/weather.ashx?key=4ba34577dab3de03fbe0b53eade625dea3ce8cdf&format=json&q="+myLocation.lat+","+myLocation.lon);
	};
	return factory.getWeatherData();
});

travelersApp.controller('WeatherCtrl',['$scope', 'weatherFactory', function($scope, weatherFactory){

		$scope.weatherHeadline = "The weather today will be:";
		$scope.handleWeatherData = function(data){
			$scope.weather = data.data.weather[0];
			console.log($scope.weather);
		};
		$scope.weather = weatherFactory.success($scope.handleWeatherData);
	}
]);



	



/*travelersApp.controller('WeatherDataCtrl',['weatherFactory',
	function(weatherFactory){
		this.message = weatherFactory;
		console.log(this.message);
	}
]);*/