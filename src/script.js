//formatting the date and time
function returnDate(timestamp) {
  let date = new Date(timestamp);

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[date.getDay()];

  return `${day}, ${formatDate(timestamp)}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
    if  (hours < 10) {
      hours = `0${hours}`;
    }
  let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    return `${hours}:${minutes}`;
}
  
  //updating temperature and city
  function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let dateElement = document.querySelector("#date");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    dateElement.innerHTML = returnDate(reponse.data.dt);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windSpeedElement.innerHTML = Math.round(reponse.data.wind.speed);
  }
  
  //calling the api
  function search(city) {
  let apiKey = "5c043c30014fadd9b81c029b76e781d4";
  let cityName = "New York";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  }

  function enterCity(event) {
    event.preventDefault();
    let enterCityInput = document.querySelector("#search-input");
    search(enterCityInput.value);
  }

  let formSubmit = document.querySelector("#search-form");
  formSubmit.addEventListener("submit", enterCity);