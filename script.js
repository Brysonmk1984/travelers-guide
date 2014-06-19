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
		$scope.currentLocation;
		$scope.city;
		$scope.state;
		$scope.lat;
		$scope.lng;
		$scope.handleWeatherData = function(weatherData){
			$scope.weather = weatherData.data.weather[0];
			console.log(weatherData.data.weather[0]);

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
				      if (status == google.maps.GeocoderStatus.OK) {
				        if (results[1]) {
				        	console.log(results);
				        //find country name
				             for (var i=0; i<results[0].address_components.length; i++) {
				            for (var b=0;b<results[0].address_components[i].types.length;b++) {

				            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
				                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
				                    //this is the object you are looking for
				                    city= results[0].address_components[i];
				                    break;
				                }
				            }
				        }
				        
				        

				        	$scope.currentLocation = results[0].formatted_address;
				        	$scope.city = results[0].address_components[3].long_name;
				        	$scope.state = results[0].address_components[5].short_name;
				        	$scope.lat = locationObject.lat;
				        	$scope.lng = locationObject.lng;

				        } else {
				          alert("No results found");
				        }
				      } else {
				        alert("Geocoder failed due to: " + status);
				      }
				    });
				}



				codeLatLng(locationObject.lat, locationObject.lng);
				

  				

			





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



	