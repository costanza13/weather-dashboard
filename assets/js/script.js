const OWM_KEY = 'f396f0f7fdce40c1a84f7337a2c39948';

const cityInputEl = document.querySelector('#city');
const searchButtonEl = document.querySelector('#search-for-city');
const weatherInfoEl = document.querySelector('#weather-info');
const currentWeatherEl = document.querySelector('#current-weather');
const currentWeatherHeadingEl = document.querySelector('#current-weather-heading');
const currentTemperatureEl = document.querySelector('#current-temp');
const currentWindEl = document.querySelector('#current-wind');
const currentHumidityEl = document.querySelector('#current-humidity');
const currentUvIndexEl = document.querySelector('#current-uv-index');
const forecastCardEls = document.querySelectorAll('.card');
const messagesEl = document.querySelector('#messages');

var currentCity;

var cityInfoJson = [{"name":"New York City","local_names":{"af":"New York Stad","ar":"نيويورك","ascii":"New York City","bg":"Ню Йорк","ca":"Nova York","da":"New York","de":"New York City","el":"Νέα Υόρκη","en":"New York","eu":"York Berri","fa":"نیویورک","feature_name":"New York City","fi":"New York","fr":"New York","gl":"Nova Iorque","he":"ניו יורק","hi":"न्यूयॉर्क","hr":"New York","hu":"New York","id":"Kota New York","it":"New York","ja":"ニューヨーク","la":"Novum Eboracum","lt":"Niujorkas","mk":"Њу Јорк","nl":"New York","no":"New York","pl":"Nowy Jork","pt":"Nova Iorque","ro":"New York City","ru":"Нью-Йорк","sk":"New York","sl":"New York","sr":"Њујорк","th":"นครนิวยอร์ก","tr":"New York kenti","vi":"Thành phố New York"},"lat":40.7143,"lon":-74.006,"country":"US","state":"NY"},{"name":"New York","local_names":{"ar":"نيويورك","ascii":"New York","az":"Nyu-York","bg":"Ню Йорк","ca":"Nova York","da":"New York","de":"New York","el":"Νέα Υόρκη","en":"New York","fa":"ایالت نیویورک","feature_name":"New York","fi":"New York","fr":"New York","gl":"Nova York","he":"ניו יורק","hi":"न्यूयॉर्क","hr":"New York","hu":"New York","id":"New York","it":"New York","ja":"ニューヨーク州","la":"Novum Eboracum","lt":"Niujorko valstija","mk":"Њујорк","nl":"New York","no":"New York State","pl":"Nowy Jork","pt":"Nova Iorque","ro":"New York","ru":"Нью-Йорк","sk":"New York","sl":"New York","sr":"Њујорк","th":"รัฐนิวยอร์ก","tr":"New York","vi":"Tiểu bang New York","zu":"New York Isifunda"},"lat":43.0004,"lon":-75.4999,"country":"US","state":"NY"}];
var weatherInfoJson = {"lat":40.7143,"lon":-74.006,"timezone":"America/New_York","timezone_offset":-14400,"current":{"dt":1619591524,"sunrise":1619603885,"sunset":1619653716,"temp":53.74,"feels_like":52.16,"pressure":1013,"humidity":71,"dew_point":44.58,"uvi":0,"clouds":75,"visibility":10000,"wind_speed":9.22,"wind_deg":30,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}]},"daily":[{"dt":1619625600,"sunrise":1619603885,"sunset":1619653716,"moonrise":1619661780,"moonset":1619607780,"moon_phase":0.56,"temp":{"day":75.16,"min":53.74,"max":79.99,"night":68.77,"eve":77.32,"morn":54.25},"feels_like":{"day":74.88,"night":53.19,"eve":77.34,"morn":53.19},"pressure":1010,"humidity":53,"dew_point":56.95,"wind_speed":13.96,"wind_deg":244,"wind_gust":23.49,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":100,"pop":0.93,"rain":2.31,"uvi":5.93},{"dt":1619712000,"sunrise":1619690207,"sunset":1619740179,"moonrise":1619752800,"moonset":1619696760,"moon_phase":0.6,"temp":{"day":62.42,"min":62.11,"max":67.86,"night":66.45,"eve":66.54,"morn":63.61},"feels_like":{"day":62.69,"night":64.13,"eve":67.03,"morn":64.13},"pressure":1008,"humidity":92,"dew_point":60.24,"wind_speed":15.28,"wind_deg":233,"wind_gust":34.29,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":100,"pop":0.97,"rain":4.28,"uvi":0.81},{"dt":1619798400,"sunrise":1619776529,"sunset":1619826643,"moonrise":0,"moonset":1619786160,"moon_phase":0.64,"temp":{"day":66.52,"min":47.64,"max":66.69,"night":47.64,"eve":59.74,"morn":59.72},"feels_like":{"day":64.76,"night":59.02,"eve":57.11,"morn":59.02},"pressure":1000,"humidity":40,"dew_point":41.07,"wind_speed":23.02,"wind_deg":285,"wind_gust":45.81,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":53,"pop":0.88,"rain":1.22,"uvi":4.59},{"dt":1619884800,"sunrise":1619862853,"sunset":1619913106,"moonrise":1619843340,"moonset":1619876160,"moon_phase":0.67,"temp":{"day":52.36,"min":42.57,"max":59.9,"night":52.75,"eve":59.9,"morn":42.57},"feels_like":{"day":49.5,"night":33.51,"eve":57.33,"morn":33.51},"pressure":1013,"humidity":47,"dew_point":32.77,"wind_speed":21.54,"wind_deg":304,"wind_gust":39.57,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":5,"pop":0,"uvi":7.48},{"dt":1619971200,"sunrise":1619949178,"sunset":1619999569,"moonrise":1619933280,"moonset":1619966460,"moon_phase":0.71,"temp":{"day":64,"min":51.8,"max":73.9,"night":64.81,"eve":73.9,"morn":51.8},"feels_like":{"day":61.66,"night":49.41,"eve":72.68,"morn":49.41},"pressure":1013,"humidity":33,"dew_point":34.57,"wind_speed":16.31,"wind_deg":255,"wind_gust":25.68,"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":88,"pop":0,"uvi":0.95},{"dt":1620057600,"sunrise":1620035504,"sunset":1620086032,"moonrise":1620022500,"moonset":1620056940,"moon_phase":0.75,"temp":{"day":71.65,"min":59.86,"max":74.86,"night":66.02,"eve":69.73,"morn":59.86},"feels_like":{"day":70.83,"night":58.8,"eve":69.08,"morn":58.8},"pressure":1012,"humidity":49,"dew_point":51.24,"wind_speed":14.99,"wind_deg":219,"wind_gust":27.51,"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":99,"pop":0.07,"uvi":1},{"dt":1620144000,"sunrise":1620121832,"sunset":1620172495,"moonrise":1620111180,"moonset":1620147360,"moon_phase":0.78,"temp":{"day":73.22,"min":63.91,"max":80.55,"night":68.29,"eve":80.55,"morn":63.91},"feels_like":{"day":73.15,"night":64.09,"eve":80.98,"morn":64.09},"pressure":1009,"humidity":62,"dew_point":59.4,"wind_speed":13.09,"wind_deg":251,"wind_gust":23.35,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":83,"pop":1,"rain":2.71,"uvi":1},{"dt":1620230400,"sunrise":1620208161,"sunset":1620258958,"moonrise":1620199500,"moonset":1620237660,"moon_phase":0.81,"temp":{"day":67.86,"min":54.99,"max":73.4,"night":54.99,"eve":67.19,"morn":64.87},"feels_like":{"day":67.87,"night":65.43,"eve":67.19,"morn":65.43},"pressure":1011,"humidity":75,"dew_point":59.34,"wind_speed":14.14,"wind_deg":104,"wind_gust":24.09,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":100,"pop":1,"rain":21.96,"uvi":1}]};

var getWeatherForCity = function(city) {
  weatherInfoEl.classList.add("hidden");
  messagesEl.classList.add('hidden');

  // currentCity = cityInfoJson[0].name;
  // getWeatherByLocation(cityInfoJson[0].lat, cityInfoJson[0].lon);
  
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
  // updateWeatherDashboard(weatherInfoJson);

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

  // current weather
  var dateStr = new dayjs.unix(weather.current.dt).format('M/D/YYYY');
  currentWeatherHeadingEl.innerHTML = currentCity + ' (' + dateStr + ') <img src="http://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '.png" />';
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
    var dateStr = new dayjs.unix(weather.daily[i].dt).format('M/D/YYYY');
    var cardBodyHtml = '<h5 class="card-title">' + dateStr + '</h5>' +
      '<p><img src="http://openweathermap.org/img/wn/' + weather.daily[i].weather[0].icon + '.png" /></p>' +
      '<p>Temp: ' + weather.daily[i].temp.day + ' &deg;F</p>' +
      '<p>Wind: ' + weather.daily[i].wind_speed + ' MPH</p>' +
      '<p>Humidity: ' + weather.daily[i].humidity + ' %</p>';

    forecastCardEls[i].innerHTML = cardBodyHtml;
  }


  if (weatherInfoEl.classList.contains("hidden")) {
    weatherInfoEl.classList.remove("hidden");
  }
  
};

var displayError = function (error) {
  console.log(error);
  messagesEl.classList.remove('hidden');
};


var handleSearch = function(event) {
  event.preventDefault();
  currentCity = cityInputEl.value;
  getWeatherForCity(currentCity);
};


// currentCity = 'new york';
// getWeatherForCity(currentCity);

// search form event listener
searchButtonEl.addEventListener('click', handleSearch);