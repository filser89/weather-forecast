// TODO: Write your JS code in here
import $ from "jquery";
import "select2";

const apiKey = "8cd2be126b7386bcc9f089dc7460981e";
const cities = [
  "Amsterdam",
  "Bali",
  "Barcelona",
  "Belo Horizonte",
  "Berlin",
  "Bordeaux",
  "Brussels",
  "Buenos Aires",
  "Casablanca",
  "Chengdu",
  "Copenhagen",
  "Kyoto",
  "Lausanne",
  "Lille",
  "Lisbon",
  "London",
  "Lyon",
  "Madrid",
  "Marseille",
  "Melbourne",
  "Mexico",
  "Milan",
  "Montréal",
  "Nantes",
  "Oslo",
  "Paris",
  "Rio de Janeiro",
  "Rennes",
  "Rome",
  "São Paulo",
  "Seoul",
  "Shanghai",
  "Shenzhen",
  "Singapore",
  "Stockholm",
  "Tel Aviv",
  "Tokyo",
];

$("#city-input").select2({ data: cities, width: "70%" });

// DOM elements
const cityElement = document.querySelector("#city");
const dateElement = document.querySelector("#date");
const descriptionElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const temperatureElement = document.querySelector("#temperature");
const searchFormElement = document.querySelector("#search-form");
const cityInputElement = document.querySelector("#city-input");
const linkElenment = document.querySelector("#link");

const buildQuery = (params) => {
  if (params.hasOwnProperty("q")) return `q=${params.q}`;
  if (params.hasOwnProperty("lat") && params.hasOwnProperty("lon"))
    // eslint-disable-next-line nonblock-statement-body-position
    return `lat=${params.lat}&lon=${params.lon}`;
};
const fetchWeather = (params) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&${buildQuery(
    params
  )}&appid=${apiKey}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Received data", data);
      let city = data.name;
      //   console.log("City", city);
      let rawDate = new Date();
      let date = rawDate.toLocaleString();
      //   console.log("date", date);
      let weather = data.weather[0];
      //   console.log(weather);
      let description = weather.description;
      //   console.log("description", description);
      let weatherIcon = weather.icon;
      let weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      //   console.log("icon", weatherIcon);
      let temperatureFloat = data.main.temp;
      let temperature = Math.round(temperatureFloat);

      cityElement.innerText = city;
      dateElement.innerText = date;
      descriptionElement.innerText = description;
      weatherIconElement.src = weatherIconUrl;
      temperatureElement.innerText = temperature;
    });
};
// fetchWeather({ q: "shanghai" });

const setWeatherByLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (data) => {
      console.log(data);
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;
      fetchWeather({ lat: lat, lon: lon });
    },
    () => console.log("error")
  );
};
setWeatherByLocation();

searchFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeather({ q: cityInputElement.value });
  //   console.log(e);
});

linkElenment.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  setWeatherByLocation();
});
