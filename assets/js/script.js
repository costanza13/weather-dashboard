const OWM_KEY = 'f396f0f7fdce40c1a84f7337a2c39948';

const weatherInfoEl = document.querySelector('#weather-info');
const currentWeatherEl = document.querySelector('#current-weather');
const currentWeatherHeadingEl = document.querySelector('#current-weather-heading');
const currentTemperatureEl = document.querySelector('#current-temp');
const currentWindEl = document.querySelector('#current-wind');
const currentHumidityEl = document.querySelector('#current-humidity');
const currentUvIndexEl = document.querySelector('#current-uv-index');

var currentCity;

var getWeatherForCity = function(city) {
  weatherInfoEl.classList.add("hidden");
  var endpoint = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=3&appid=' + OWM_KEY;

  fetch(endpoint).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        if (data.length) {
          console.log(data[0]);
          currentCity = data[0].name;
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
  var endpoint = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly&units=imperial&appid=' + OWM_KEY;

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

  var dateStr = new dayjs.unix(weather.current.dt).format('M/D/YYYY');
  currentWeatherHeadingEl.innerHTML = currentCity + ' (' + dateStr + ') <img src="http://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '.png" />';
  currentTemperatureEl.innerHTML = 'Temp: ' + weather.current.temp + '&deg;F';
  currentWindEl.textContent = 'Wind: ' + weather.current.temp + ' MPH';
  currentHumidityEl.textContent = 'Humidity: ' + weather.current.humidity + '%';

  var uviClass;
  if (weather.current.uvi > 6) {
    uviClass = 'bg-danger';
  } else if (weather.current.uvi < 3) {
    uviClass = 'bg-success';
  } else {
    uviClass = 'bg-warning';
  }
  var uviHtml = '<span class="text-light ' + uviClass + ' px-3 py-1 rounded">' + weather.current.uvi + '</span>';
  currentUvIndexEl.innerHTML = 'UV Index: ' + uviHtml;
  
  if (weatherInfoEl.classList.contains("hidden")) {
    weatherInfoEl.classList.remove("hidden");
  }
  
};

var displayError = function (error) {
  console.log(error);
};


currentCity = 'new york';
getWeatherForCity(currentCity);
