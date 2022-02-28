let now = new Date();
console.log(now);
console.log(now.getMilliseconds());
console.log(now.getDay());
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let pdate = now.getDate();
  let month = months[date.getMonth()];
  let year = now.getFullYear();
  let day = days[date.getDay()];

  let pageDate = document.querySelector("h3.date");
  pageDate.innerHTML = `${pdate} ${month} ${year}`;
  let pageDay = document.querySelector("h3.day");
  pageDay.innerHTML = `${day}`;
}
let date = new Date();
console.log(formatDate(date));

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${minutes}`;

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#windspeed");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  windElement.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "732b2a948c672aa8d652e665fc139d07";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchFunction = document.querySelector("#city-form");
searchFunction.addEventListener("submit", searchCity);

let celciusTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function covertToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", covertToCelcius);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("#temperature");
  let location = document.querySelector("#city-name");
  let wind = document.querySelector("#windspeed");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");

  heading.innerHTML = `${temperature}`;
  location.innerHTML = response.data.name;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(position);
  let units = "metric";
  let apiKey = "732b2a948c672aa8d652e665fc139d07";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiURL);
  axios.get(apiURL).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#mylocation");
currentButton.addEventListener("click", getCurrentPosition);
