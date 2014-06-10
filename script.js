$(document).ready(function(){
	var show_map = function(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		//console.log(lat);console.log(lon);
		$.get("http://api.worldweatheronline.com/free/v1/weather.ashx?key=4ba34577dab3de03fbe0b53eade625dea3ce8cdf&format=json&q="+lat+","+lon, function(data){
			//console.log(data);
			// $(data.weather.0).each(function(){
			// 	console.log('hi');
			// });
		// console.log(data.data.weather[0]);
		// for(item in data.data.weather[0]){
		// 	var key = item;
		// 	var value = data.data.weather[0][item];
		// 	$("#weatherList").append("<li>"+item +":"+value+"</li>");
		// }
			
		});
	};
	var get_location = function() {
	  navigator.geolocation.getCurrentPosition(show_map);
	};
	get_location();


(function(){
	var weatherModule = angular.module('weather',[]);
	
	weatherModule.controller('WeatherController',['$http',function($http){
		$http.get("http://api.worldweatheronline.com/free/v1/weather.ashx?key=4ba34577dab3de03fbe0b53eade625dea3ce8cdf&format=json&q="+lat+","+lon)
			.success(function(data){
		    console.log(data);
		    for(item in data.data.weather[0]){
		    	
		    }
		});
	}]);
})();
});