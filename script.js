//	=========================================
//	Getting the Weather data from DarkSky
//	=========================================

function weatherReport(latitude, longitude) {

	var apiKey       = '',		//our api
		url          = 'https://api.darksky.net/forecast/',		//the beginning for every api
		lati         = latitude,								//latitude of the city
		longi        = longitude,								//longitude of the city

		exclude		 = "?exclude=minutely,hourly,alerts,flags",		//we only want the essentials
		api_call     = "https://cors-anywhere.herokuapp.com/" + url + apiKey + "/" + lati + "," + longi + exclude;	

	// Print Link for testing
	// document.getElementById('result').innerHTML = api_call;

	$.getJSON([api_call], function(forecast) {
    	console.log(JSON.stringify(forecast, null, ' '))
 		


    // =======================================================
    // FOR CURRENT WEATHER 
    // =======================================================
    
    	summary = forecast.currently["summary"];
    	
    	temperaturef = forecast.currently["temperature"];
    	temperaturec = convertCelc(temperaturef);
    	final_temp = parseFloat(temperaturec).toFixed(2)
    	
    	humidity = forecast.currently["humidity"];
    	futForecast = forecast.daily["summary"];

    //printing result in the html
    	$('#weather').text("Current Weather in " + $("#city").val()  + " is: ");
    	$('#summary').text("Summary : " + summary);
    	$('#temperature').text("Temperature : " + final_temp + " Celcius");
    	$('#humidity').text("Humidity : " + humidity);

    // =======================================================
    // FOR DAILY WEATHER FORCAST
    // =======================================================

    	

    	$('#forecast').text("Forecast : " + futForecast);

	});

}

// =================================================
// Convert to Celcius
// ================================================

function convertCelc(fahren) {
	var temp = ((fahren-32)*5)/9;

	return temp;
}


// =================================================
// Button Action
// =================================================

function getWeather() {
	latitude = document.getElementById('latitude').value;
	longitude = document.getElementById('longitude').value;

	weatherReport(latitude, longitude)


}


// =================================================
// For autofilling from city name
// =================================================

function insertGoogleScript() {
	var google_api = document.createElement('script'),
			api_key    = '';

	// Inject the script for Google's API and reference the initGoogleAPI
	// function as a callback.
	google_api.src = 'https://maps.googleapis.com/maps/api/js?key='+ api_key +'&callback=initGoogleAPI&libraries=places,geometry';
	document.body.appendChild(google_api);


}


// SearchBox Method
function initGoogleAPI() {
	var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city"));

	autocomplete.addListener('places_changed', function() {
		var place = autocomplete.getPlaces()[0];
		document.querySelector("#latitude").value = place.geometry.location.lat();
		document.querySelector("#longitude").value = place.geometry.location.lng();
	});
}

insertGoogleScript();
