const showWeather = document.querySelector(".weather-show");
const form = document.querySelector("form");
const searchInput = document.querySelector("form input");
const country = document.querySelector(".country");
// const city=document.querySelector('.city');//
const temperature = document.querySelector(".temperature");
const icon = document.querySelector(".icon-weather");
const condition = document.querySelector(".condition");
const date = document.querySelector(".date");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const loader = document.querySelector(".loader");
const errorSearch = document.querySelector(".error");

const getWeather = async (city) => {
  try {
    loader.style.display = "block";
    showWeather.style.display = "none";
    errorSearch.style.display = "none";
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=CQ9NP6K6RE65K42QSBW4MSYV8`
    );
    const data = await res.json();
    console.log(data);
    country.innerHTML = data.resolvedAddress;
    // city.innerHTML=data.address;//
    humidity.innerHTML = data.currentConditions.humidity + "%";
    condition.innerHTML = data.currentConditions.conditions;
    temperature.innerHTML = data.currentConditions.temp + "°C";
    icon.innerHTML = data.currentConditions.icon;
    date.innerHTML = data.days[0].datetime;
    wind.innerHTML = data.currentConditions.windspeed + " m/s";
    showWeather.style.display = "block";
    loader.style.display = "none";
  } catch (error) {
    loader.style.display = "none";
    showWeather.style.display = "none";
    errorSearch.style.display = "block";
    setTimeout(() => {
      errorSearch.style.display = "none";
    }, 2000);
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(searchInput.value.trim());
  searchInput.value = "";
});
