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

    var date = moment().format('M DD YYYY');

    function storeCities() {
        $('.previous-cities').empty()
        var recentCities = JSON.parse(localStorage.getItem('cities')) || []
        //console.log(recentCities);
        for (var i = 0; i < recentCities.length; i++) {
            while (recentCities.length > 5) {
                var lastFive = recentCities.length - 5;
                var index = 0;
                recentCities.splice(index, lastFive);
                index++
            }
            var newCity = $('<li>')
            newCity.addClass("list-group-item");
            newCity.text(recentCities[i].name)
            $('.previous-cities').append(newCity);

            
        }
        console.log(recentCities);
    }
    storeCities()

    $(".button").on("click", function (event) {
        event.preventDefault();

        var city = $('.form-control').val()
        var cityList = [];

        var recentCities = JSON.parse(localStorage.getItem('cities')) || []
        $('.previous-cities').val(recentCities);
        var savedCity = {
            name: city
        };
        recentCities.push(savedCity);
        localStorage.setItem('cities', JSON.stringify(recentCities));

        storeCities()
        search(city);
    })



    $('.previous-cities').on('click', "li", function (event) {
        event.preventDefault();
        var city = $(this).text()
        search(city);


    })
    function search(city) {
        $('.card-body').html(' ');

        var queryURLOne = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3fd6fe0ffea0635ce66bad8fbbaab06d'


        $.when(
            $.ajax({
                url: queryURLOne,
                method: "GET"

            }))
            .then(function (response) {
                var latitude = response.coord.lat;
                var longititude = response.coord.lon;
                var queryURLTwo = 'https://api.openweathermap.org/data/2.5/uvi?appid=3fd6fe0ffea0635ce66bad8fbbaab06d&lat=' + latitude + '&lon=' + longititude;
                //console.log(response)
                // Generate separate API call for UV index after inital API call to first obtain latitude and longitude from city weather data
                $.ajax({
                    url: queryURLTwo,
                    method: "GET"
                })
                    .then(function (responseTwo) {
                        //console.log(responseTwo);


                        //Generate code for storage of current information in information card; 5 day forecast information; on different urls

                        //console.log(response.name)

                        var cityName = response.name;
                        var temp = (response.main.temp - 273.15) * 9 / 5 + 32
                        var fahrenheit = $('<p>')
                        var humidity = $('<p>');
                        var windSpeed = response.wind.speed * 2.236936;
                        var imperialWindSpeed = $('<p>');
                        var indexEl = $('<span>');
                        indexEl.text("UV Index: ");
                        var indexNumber = parseFloat(responseTwo.value)
                        var indexNumberEl = $('<span>');
                        indexNumberEl.text(indexNumber);
                        indexNumberEl.attr('id', 'index-number');

                        if (indexNumber <= 2) {
                            indexNumberEl.addClass('d-inline p-2 bg-success text-white')

                        } else if (indexNumber >= 3 && indexNumber <= 7) {
                            indexNumberEl.addClass('d-inline p-2 bg-warning text-white')

                        } else {
                            indexNumberEl.addClass('d-inline p-2 bg-danger text-white')

                        }

                        var todaysWeather = response.weather[0].icon;
                        //cityName.text(response.name)
                        fahrenheit.text("Temperature: " + temp.toFixed(1) + "°F")
                        humidity.text("Humidity: " + response.main.humidity + '%')
                        imperialWindSpeed.text("Wind Speed: " + windSpeed.toFixed(1) + " MPH")

                        //var uvIndex = (indexEl + indexNumber);

                        var weatherIcon = 'https://openweathermap.org/img/wn/' + todaysWeather + ".png";
                        var iconDisplay = $('<img>')
                        iconDisplay.attr('src', weatherIcon);
                        $('.city-name').append(cityName + ": " + date);
                        $('.city-name').append(iconDisplay);
                        $('.city-name').append(fahrenheit);
                        $('.city-name').append(humidity);
                        $('.city-name').append(imperialWindSpeed);
                        $('.city-name').append(indexEl);
                        $('.city-name').append(indexNumberEl);
                    })



                var queryURLThree = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=3fd6fe0ffea0635ce66bad8fbbaab06d'
                $.ajax({
                    url: queryURLThree,
                    method: "GET"
                })
                    .then(function (responseThree) {
                        //console.log(responseThree);
                        var dayOne = $('<h6>');
                        var dayTwo = $('<h6>');
                        var dayThree = $('<h6>');
                        var dayFour = $('<h6>');
                        var dayFive = $('<h6>');
                        dayOne.text(moment(date).add(1, 'd').format('l'));
                        dayTwo.text(moment(date).add(2, 'd').format('l'));
                        dayThree.text(moment(date).add(3, 'd').format('l'));
                        dayFour.text(moment(date).add(4, 'd').format('l'));
                        dayFive.text(moment(date).add(5, 'd').format('l'));
                        $('#1').append(dayOne);
                        $('#2').append(dayTwo);
                        $('#3').append(dayThree);
                        $('#4').append(dayFour);
                        $('#5').append(dayFive);

                        var j = 1
                        for (var i = 0; i < responseThree.list.length; i++) {

                            if (responseThree.list[i].dt_txt.indexOf("12:00:00") !== -1 &&
                                responseThree.list[i].dt_txt.indexOf("15:00:00") !== -1 ||
                                responseThree.list[i].dt_txt.indexOf("18:00:00") !== -1) {

                                var selector = "#" + j;
                                var forecastTempOne = (responseThree.list[i].main.temp_max - 273.15) * 9 / 5 + 32
                                var forecastFahrenheitOne = $('<p>');
                                var forecastHumidityOne = $('<p>');
                                var forecastWeatherOne = responseThree.list[i].weather[0].icon;
                                var weatherIconOne = 'https://openweathermap.org/img/wn/' + forecastWeatherOne + ".png";
                                var iconDisplayOne = $('<img>')
                                iconDisplayOne.attr('src', weatherIconOne);
                                forecastFahrenheitOne.text("Temp: " + forecastTempOne.toFixed(1) + "°F");
                                forecastHumidityOne.text("Humidity: " + responseThree.list[i].main.humidity + '%');
                                $(selector).append(forecastFahrenheitOne);
                                $(selector).append(forecastHumidityOne);
                                $(selector).append(iconDisplayOne);
                                //console.log(forecastWeatherOne);
                                j++;
                            }
                        }

                    })
            })


    }

    //Set up array for previously visited cities


});
//Set up click event for when user clicks on previous cities to pull up forecast





//Set up Open Weather API to connect weather data to page

//Set up local storage to store persistent changes in array of previously visited cities