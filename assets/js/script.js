const OWM_KEY = 'f396f0f7fdce40c1a84f7337a2c39948';
const weatherInfoEl = document.querySelector('#weather-info');

var getWeatherForCity = function(city) {
  var endpoint = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=3&appid=' + OWM_KEY;

  fetch(endpoint).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        if (data.length) {
          getWeatherByLocation(data[0].lat, data[0].lon);
        } else {
          displayError("No cities matched '" + city + "'");
        }
      });
    } else {
      displayError('Unable to fetch city information');
    }
  });
};

var getWeatherByLocation = function(latitude, longitude) {
  var endpoint = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely&units=imperial&appid=' + OWM_KEY;

  fetch(endpoint).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        updateWeatherDashboard(data);
      });
    } else {
      displayError('Unable to fetch weather information');
    }
  });
};

var updateWeatherDashboard = function (weather) {
  console.log(weather);
  if (weatherInfoEl.classList.contains("hidden")) {
    weatherInfoEl.classList.remove("hidden");
  }
  
};

var displayError = function (error) {
  console.log(error);
};

getWeatherForCity('new york');
