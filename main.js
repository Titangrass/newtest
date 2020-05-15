const api = {
  key: "ac0946420d7b5932808b17499c03c240",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {

  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = ` ${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `High: ${Math.round(weather.main.temp_min)}°C / Low: ${Math.round(weather.main.temp_max)}°C`;

  let pressure = document.querySelector('.current .pressure');
  pressure.innerText = `Pressure: ${weather.main.pressure} hPa`;
  
  let humidity = document.querySelector('.current .humidity');
  humidity.innerText = `Humidity: ${weather.main.humidity} %`;
  
  let winds = document.querySelector('.current .wind');
  winds.innerText = `Wind Speed: ${(weather.wind.speed)} m/s`;

  let rain = document.querySelector('.current .rain');
  rain.innerText = `${weather.rain}`;
  if(weather.rain == null)
        rain.innerText = ("No Rainfall");
  else
    rain.innerText = ("Rainfal expected");


}

function dateBuilder (d) {
  let months = 
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = 
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
