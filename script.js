var travelersApp = angular.module('travelersApp', []);

var locationObject = {};
var findMyLocation = function(){
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
};
findMyLocation();


travelersApp.factory('weatherFactory', function($http){
	var factory = {};
	factory.getWeatherData = function(){
		var myLocation = {
			lat : 40,
			lon : -105
		};
		return $http.get("http://api.worldweatheronline.com/free/v1/weather.ashx?key=4ba34577dab3de03fbe0b53eade625dea3ce8cdf&format=json&q="+myLocation.lat+","+myLocation.lon);
	};
	return factory.getWeatherData();
});

travelersApp.controller('WeatherCtrl',['$scope', 'weatherFactory', function($scope, weatherFactory){

		// setTimeout(function(){

		// 	weatherFactory();
		// },7000);
		


		$scope.weatherHeadline = "The weather today will be:";
		$scope.handleWeatherData = function(data){
			$scope.weather = data.data.weather[0];
			console.log($scope.weather);
		};
		// $scope.weather = weatherFactory.success($scope.handleWeatherData);
	}
]);



	