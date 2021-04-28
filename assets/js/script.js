const OWM_KEY = 'f396f0f7fdce40c1a84f7337a2c39948';

const cityInputEl = document.querySelector('#city');
const searchButtonEl = document.querySelector('#search-for-city');
const searchHistoryEl = document.querySelector('#search-history');
const weatherInfoEl = document.querySelector('#weather-info');
const currentWeatherEl = document.querySelector('#current-weather');
const currentWeatherHeadingEl = document.querySelector('#current-weather-heading');
const currentTemperatureEl = document.querySelector('#current-temp');
const currentWindEl = document.querySelector('#current-wind');
const currentHumidityEl = document.querySelector('#current-humidity');
const currentUvIndexEl = document.querySelector('#current-uv-index');
const forecastCardEls = document.querySelectorAll('.card');
const messagesEl = document.querySelector('#messages');

var searchHistoryData;

var loadSearchHistory = function() {

  searchHistoryEl.innerHTML = '';

  var searchHistoryDataStr = localStorage.getItem('weatherSearchHistory');
  if (searchHistoryDataStr) {
    searchHistoryData = JSON.parse(searchHistoryDataStr);
    for (var i = 0; i < searchHistoryData.length; i++) {
      var title = searchHistoryData[i].key.replace(',US', '').replace(',', ', ');
      searchHistoryEl.innerHTML += '<button type="button" title="' + title + '" class="btn btn-secondary btn-block mt-3 text-dark" data-index="' + i + '" data-key="' + searchHistoryData[i].key + '">' + searchHistoryData[i].name + '</button>'
    }
    if (searchHistoryEl.innerHTML) {
      searchHistoryEl.classList.remove('d-none');
    }
  } else {
    searchHistoryData = [];
  }
};

var updateSearchHistory = function(cityData, multipleMatches) {
  var key = cityData.name;
  if (cityData.country == 'US') {
    key += ',' + cityData.state + ',' + 'US';
  } else {
    key += ',' + cityData.country;
  }
  cityData.key = key;

  // if this city is already in the history, remove it
  for (var i = 0; i < searchHistoryData.length; i++) {
    if (searchHistoryData[i].key === cityData.key) {
      searchHistoryData.splice(i, 1);
    }
  }

  searchHistoryData.unshift(cityData);
  if (searchHistoryData.length > 10) {
    searchHistoryData = searchHistoryData.slice(0, 10);
  }
  localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistoryData));
  loadSearchHistory();
}

var weatherCitySearch = function(city) {
  weatherInfoEl.classList.add("d-none");

  var endpoint = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=3&appid=' + OWM_KEY;

  fetch(endpoint).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        if (data.length) {
          console.log(data[0]);
          getWeatherForCity(data[0]);
        } else {
          displayError('No cities matched "' + city + '".<br>Check spelling or search for a different city.');
        }
      });
    } else {
      displayError('Unable to fetch city information.<br>[ ' + response.statusText + ' ]<br>Please try again later.');
    }
  }).catch(function(error) {
    displayError('Unable to fetch city information.<br>[ ' + error + ' ]<br>Please try again later.');
  });
};

var getWeatherForCity = function(cityData) {
  updateSearchHistory(cityData);
  messagesEl.classList.add('d-none');

  var endpoint = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityData.lat + '&lon=' + cityData.lon + '&exclude=minutely,hourly&units=imperial&appid=' + OWM_KEY;

  fetch(endpoint).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        data.city = cityData.name;
        updateWeatherDashboard(data);
      });
    } else {
      displayError('Unable to fetch weather information.<br>[ ' + response.statusText + ' ]<br>Please try again later.');
    }
  }).catch(function(error) {
    displayError('Unable to fetch weather information.<br>[ ' + error + ' ]<br>Please try again later.');
  });
};

var updateWeatherDashboard = function (weather) {
  console.log(weather);

  // current weather
  var dateStr = new dayjs.unix(weather.current.dt).format('M/D/YYYY');
  currentWeatherHeadingEl.innerHTML = weather.city + ' (' + dateStr + ') <img src="https://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '.png" />';
  currentTemperatureEl.innerHTML = 'Temp: ' + weather.current.temp + ' &deg;F';
  currentWindEl.textContent = 'Wind: ' + weather.current.temp + ' MPH';
  currentHumidityEl.textContent = 'Humidity: ' + weather.current.humidity + ' %';

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
  
  // 5-day forecast
  for (var i = 0; i < forecastCardEls.length; i++) {
    var dateStr = new dayjs.unix(weather.daily[i + 1].dt).format('M/D/YYYY');
    var cardBodyHtml = '<h5 class="card-title">' + dateStr + '</h5>' +
      '<p><img src="https://openweathermap.org/img/wn/' + weather.daily[i + 1].weather[0].icon + '.png" /></p>' +
      '<p>Temp: ' + weather.daily[i].temp.day + ' &deg;F</p>' +
      '<p>Wind: ' + weather.daily[i].wind_speed + ' MPH</p>' +
      '<p>Humidity: ' + weather.daily[i].humidity + ' %</p>';

    forecastCardEls[i].innerHTML = cardBodyHtml;
  }

  // hide the messages div and show the weather info
  messagesEl.classList.remove('d-block');
  messagesEl.classList.add('d-none');
  weatherInfoEl.classList.remove('d-none');
};

var displayError = function (error) {
  console.log(error);
  messagesEl.innerHTML = '<p class="d-inline-block align-middle bg-info text-light rounded p-2">' + error + '</p>';
  messagesEl.classList.remove('d-none');
  messagesEl.classList.add('d-block');
};

var handleSearch = function(event) {
  event.preventDefault();
  var city = cityInputEl.value;
  cityInputEl.value = '';
  weatherCitySearch(city);
};

var handleHistorySearch = function(event) {
  event.preventDefault();
  var cityData = searchHistoryData[parseInt(event.target.getAttribute('data-index'))];
  console.log('history city data', cityData);
  getWeatherForCity(cityData);
};


loadSearchHistory();
if (searchHistoryData.length) {
  getWeatherForCity(searchHistoryData[0]);
}

// search form event listener
searchButtonEl.addEventListener('click', handleSearch);

searchHistoryEl.addEventListener('click', handleHistorySearch);