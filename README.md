# weather-app

In this project, using JQuery, Bootstrap and the OpenWeatherMap API, I assembled an Weather Dashboard application that used two OpenWeatherMap API calls to provide the current weather conditions in a given city, including:

Current temparature
Current humidity
Current wind speed
Current UV Index - with a background indicating whether the UV index was low, moderate or high (separate API call)
Icon illustrating the current weather

I then provided a 5-day forecast using a separate API call showing the:

Forecasted temparature
Forecasted humidity, and 
Forecasted weather icon

I then created an array that allowed the user to enter multiple cities to track the conditions in multiple locations and stores the cities selected to local storage, so the cities selected persisted on the page after a page reload. The array would cap at five cities at a time, with a newer city overriding older cities selected. 
