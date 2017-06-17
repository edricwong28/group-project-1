var mainWeather = {
      init : function(){
          $("#submitWeather").click(function() {
            return mainJS.getWeather();
            }
        });
      },
 
    getWeather: function () {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $("#cityInput").val() + "," + $("#countryInput").val(),
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                var wrapper = $("#WeatherWrapper");
                wrapper.empty();
                wrapper.append("<div class='city'> <p>Place: " + data.name + ", " + data.sys.country + "</p></div>");
                wrapper.append(mainWeather.createWeatherWidg(data));
            },
            error: function () {
                alert('Failed!');
            }
 
        });
    },
 
      //Prints result from the weatherapi, receiving as param an object
       createWeatherWidg: function (data) {
        return "<div class='pressure'> <p>Temperature: " + (data.main.temp - 273.15).toFixed(2) + " C</p></div>"+
                "<div class='description'> <p>Title: " + data.weather[0].main + "</p></div>" +
                "<div class='description'> <p>Description: " + data.weather[0].description + "</p></div>" +
                "<div class='wind'> <p>Wind Speed: " + data.wind.speed + "</p></div>" +
                "<div class='humidity'> <p>Humidity: " + data.main.humidity + "%</p></div>" +
                "<div class='pressure'> <p>Pressure: " + data.main.pressure + " hpa</p></div>";
    }
}
// var APIkey = "8c41144d588138315695dd6731cb7cea";
// // var APIkey = "166a433c57516f51dfab1f7edaed8413";
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=92833&APPID=8c41144d588138315695dd6731cb7cea";

// $.ajax ({
// 	url: queryURL,
// 	method:"GET"
// })
// .done(function(response){
// 	console.log(queryURL);
// 	console.log(response);

// 	var mainDiv = $("<div class = mainWeather");
// 	var weatherDiv = $("<div class = descrWeather>");
// 	var iconDiv = $("<div class = iconWeather>");
// 	// var zipDiv = $("<div class = zipCode>");


// 	$(".mainWeather").html(response.weather.main);
// 	$(".weatherDiv").html(response.weather.description);
// 	$(".iconWeather").html(response.weather.icon);
// 	// $(".zipDiv").html(response.zipcode);
	
// 	console.log(response.weather[0].main);
// 	console.log(response.weather[0].description);
// 	console.log(response.weather[0].icon);
// 	// console.log(response.weather[0].zipcode);
// });