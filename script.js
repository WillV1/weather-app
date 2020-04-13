// Create html/use bootstrap for including 
//nested columns for 5 day forecast/ card for current city weather element; 
//nested rows(?) or table for previously visited cities
//header for "Weather Dashboard"

//Install bootstrap for additional styling 

//Install jQuery for JS code generation functionality

//Generate search button for city input
//Set up click event that when a user searches for a city, a city is able to be pulled and viewed from search box
//Make API call for current weather based on city entered in search box
$(document).ready(function () {

    var date = moment().format('l');

    $(".button").on("click", function () {
        $('.card-body').html(' ');
        var cityList = [];
        var city = $('.form-control').val() && $('<li>')
        cityList.push(city);
        var queryURLOne = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3fd6fe0ffea0635ce66bad8fbbaab06d'


        $.when(
            $.ajax({
                url: queryURLOne,
                method: "GET"

            }))
            .then(function (response) {
                var latitude = response.coord.lat;
                var longititude = response.coord.lon;
                var queryURLTwo = 'http://api.openweathermap.org/data/2.5/uvi?appid=3fd6fe0ffea0635ce66bad8fbbaab06d&lat=' + latitude + '&lon=' + longititude;
                console.log(response)
                // Generate separate API call for UV index after inital API call to first obtain latitude and longitude from city weather data
                $.ajax({
                    url: queryURLTwo,
                    method: "GET"
                })
                    .then(function (responseTwo) {
                        console.log(responseTwo);


                        //Generate code for storage of current information in information card; 5 day forecast information; on different urls

                        //console.log(response.name)
                        var cityName = $('<h4>');
                        var temp = response.main.temp * (9 / 5) - 459.67;
                        var fahrenheit = $('<p>')
                        var humidity = $('<p>');
                        var windSpeed = response.wind.speed * 2.236936;
                        var imperialWindSpeed = $('<p>');
                        var index = $('<p>')
                        cityName.text(response.name)
                        fahrenheit.text("Temperature: " + temp.toFixed(1) + "°F")
                        humidity.text("Humidity: " + response.main.humidity + '%')
                        imperialWindSpeed.text("Wind Speed: " + windSpeed.toFixed(1) + " MPH")
                        index.text("UV Index: " + responseTwo.value)
                        $('.city-name').append(cityName).append(date);
                        $('.city-name').append(fahrenheit);
                        $('.city-name').append(humidity);
                        $('.city-name').append(imperialWindSpeed);
                        $('.city-name').append(index)
                    })

                var queryURLThree = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=3fd6fe0ffea0635ce66bad8fbbaab06d'
                $.ajax({
                    url: queryURLThree,
                    method: "GET"
                })
                    .then(function (responseThree) {
                        console.log(responseThree);
                        var dayOne = $('<h5>');
                        var dayTwo = $('<h5>');
                        var dayThree = $('<h5>');
                        var dayFour = $('<h5>');
                        var dayFive = $('<h5>');
                        dayOne.text(moment(date).add(1, 'd').format('l'));
                        dayTwo.text(moment(date).add(2, 'd').format('l'));
                        dayThree.text(moment(date).add(3, 'd').format('l'));
                        dayFour.text(moment(date).add(4, 'd').format('l'));
                        dayFive.text(moment(date).add(5, 'd').format('l'));
                        $('#one').append(dayOne);
                        $('#two').append(dayTwo);
                        $('#three').append(dayThree);
                        $('#four').append(dayFour);
                        $('#five').append(dayFive);

                        var forecastTemp = responseThree.main.temp * (9 / 5) - 459.67;
                        var forecastFahrenheit = $('<p>');
                        var forecastHumidity = $('<p>');
                        forecastFahrenheit.text("Temperature: " + forecastTemp.toFixed(1) + "°F")
                        forecastHumidity.text("Humidity: " + responseThree.main.humidity + '%')
                    })
            })
   



//Set up array for previously visited cities

})
})
//Set up click event for when user clicks on previous cities to pull up forecast





//Set up Open Weather API to connect weather data to page

//Set up local storage to store persistent changes in array of previously visited cities