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

    $(".button").on("click", function () {
        var city = $('.form-control').val()
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
                        var date = moment().format('l');
                        var temp = $('<p>');
                        var fahrenheit = temp * (9/5) - 459.67
                        var humidity = $('<p>');
                        var windSpeed = $('<p>');
                        var imperialWindSpeed = windSpeed * 2.236936
                        var index = $('<p>')
                        cityName.text(response.name)
                        farenheit.text(response.main.temp * (9/5) - 459.67)
                        humidity.text(response.main.humdity + '%')
                        imperialWindSpeed.text(response.wind.speed * 2.236936 + "MPH")
                        index.text(responseTwo.value)
                        $('.city-name').append(cityName).append(date);
                        $('.city-name').append(fahrenheit);
                        $('.city-name').append(humdity);
                        $('.city-name').append(imperialWindSpeed);
                        $('.city-name').append(index)
                    });
            })
    })
})


//Set up array for previously visited cities

//Set up click event for when user clicks on previous cities to pull up forecast





//Set up Open Weather API to connect weather data to page

//Set up local storage to store persistent changes in array of previously visited cities