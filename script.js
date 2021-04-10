
const form = document.querySelector('form')
const submitBtn = document.querySelector('.submit-btn')
const error = document.querySelector('.err-msg')
form.addEventListener('submit', handleSubmit)
submitBtn.addEventListener('click', handleSubmit)

function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();
}


async function getWeatherData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f2d18caa65bc420ab77183154211004&q=${location}&days=3&aqi=no&alerts=no`,
    {mode: 'cors'}
  )
  if (response.status === 400) {
    throwErrMsg();
  } else {
    error.style.display = 'none';
    const weatherData = await response.json()
    const newData = getData(weatherData);
    displayData(newData);
    reset()
  }
}

function throwErrMsg() {
  error.style.display = 'block';
  reset()
}

function getData(weatherData) {
  const myData = {
    condition: weatherData.current.condition.text,
    temp: Math.round(weatherData.current.temp_f),
    feelsLike: Math.round(weatherData.current.feelslike_f),
    wind: Math.round(weatherData.current.wind_mph),
    humidity: weatherData.current.humidity,
    location: weatherData.location.name,
    region: weatherData.location.region,
    country: weatherData.location.country,
  }

  return myData
}

function displayData(newData) {
  if (newData.country == "United States of America") {
    newData.country = "USA"
  }
  document.querySelector('.condition').textContent = newData.condition;
  document.querySelector('.temp').textContent = newData.temp;
  document.querySelector('.location').textContent = `${newData.location}, ${newData.region}, ${newData.country}`;
  document.querySelector('.feels-like').textContent = `FEELS LIKE: ${newData.feelsLike}`;
  document.querySelector('.wind').textContent = `WIND: ${newData.wind} MPH`;
  document.querySelector('.humidity').textContent = `HUMIDITY: ${newData.humidity}%`;
  console.log(`${newData.location}`)
}

function reset() {
  form.reset();
}

function fetchWeather() {
  const input = document.querySelector('.searchCity')
  const userLocation = input.value;
  getWeatherData(userLocation);
}
