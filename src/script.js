function cityDate(date) {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = weeks[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

//creating an event to search for a city
function searchInput(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let inputCity = document.querySelector("#search-input");
  currentCity.innerHTML = inputCity.value;
}

//updating searched city's date and time
let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = cityDate(currentTime);

//updating city using searchInput function
let enteredCity = document.querySelector("#search-form");
enteredCity.addEventListener("submit", searchInput);

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function findCity(city) {
  let key = "a7ef2b762f0c823efb0f59438b2d5e2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  findCity(city);
}

function getLocation(position) {
  let key = "a7ef2b762f0c823efb0f59438b2d5e2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let dateElement = document.querySelector("#current-date");
let timeElement = new Date();
dateElement.innerHTML = cityDate(timeElement);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

findCity("New York");