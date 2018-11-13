# Weatherandi
Weather checking web-app by using DarkSky and Google Places API

## Description
This is a web based application that gives weather status for the given city.
It is made of simple **html, javascript, and jQuery**. The weather data is retrieved from the DarkSky API. The Google API serves to provide latitude and longitude of a location, which is required by the DarkSky API.
Finally, properties of Bootstrap 4 is used.

### Prerequisites

- A supported browser 
- Internet Connection.
- Google Places API and DarkSky API
**(IMPORTANT: not provided here)**

### Workflow

1. User types city or location name, Google API provides suggestions
2. Entering a location will trigger an autocomplete from the Google API into the latitude and longitude field
3. Check the Weather
4. Weather data is retrieved from the DarkSky API corresponding to the latitude and longitude of the location
5. Data is processed in javascript, discarding unnecessary datas.
6. Weather is displayed



## Code

Here we will highlight the important codes from the files

#### Google autocomplete function from script.js
This code functions as the retriever of latitude and longitude values by inputting the city
*Note that the api_key is empty and you would need to fun
```
function insertGoogleScript() {
	var google_api = document.createElement('script'),
			api_key    = ''; //INSERT YOUR GOOGLE API

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

```


#### The DarkSky API request 
Since DarkSky API does not allow CORS (Cross Origin Resource Sharing), we would have to include cors-anywhere.herokuapp to allow us to retrieve the data.
```
api_call     = "https://cors-anywhere.herokuapp.com/" + url + apiKey + "/" + lati + "," + longi + exclude;	
```

#### Exclude
To obtain only specific current weather from DarkSky API 
```
exclude		 = "?exclude=minutely,hourly,daily,alerts,flags",		//we only want the essentials
```

#### Processing the Weather Data JSON object
After getting the JSON object data, we want to use some of the data to display them on the html.
For simplicity we only use summary, temperature and humidity here.
```
$.getJSON([api_call], function(forecast) {
    	console.log(JSON.stringify(forecast, null, ' '))
 		


    	summary = forecast.currently["summary"];
    	
    	temperaturef = forecast.currently["temperature"];
    	temperaturec = convertCelc(temperaturef);
    	final_temp = parseFloat(temperaturec).toFixed(2)
    	
    	humidity = forecast.currently["humidity"];

    	// $.each(report.currently , function(v) {
     //        alert(v.summary);
     //        return;
    	// });

    	$('#weather').text("The Weather today in " + $("#city").val()  + " is: ");
    	$('#summary').text("Summary : " + summary);
    	$('#temperature').text("Temperature : " + final_temp + " Celcius");
    	$('#humidity').text("Humidity : " + humidity);
	});
```


## Deployment

**IMPORTANT: KEYS ARE NOT PROVIDED**
For the code to function properly you would need to update the DarkSky API and Google API respectively:
- Darksky API: line 7
- Google API : line 75

## Results

![Insert](https://github.com/andkwv/Weatherandi/blob/master/results/1.png)

***

![Check](https://github.com/andkwv/Weatherandi/blob/master/results/2.png)

***

![Result](https://github.com/andkwv/Weatherandi/blob/master/results/3.png)



## Acknowledgments

* The Google Autocomplete is referenced from
https://github.com/tutsplus/building-a-weather-app-with-the-darksky-api/tree/master/js
* https://tiagovalverde.com/get-current-weather-using-dark-sky-api/
