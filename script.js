const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const wind = document.getElementById("wind"); 
const humidity = document.getElementById("humidity");
const icon = document.getElementById("icon");

async function getWeather() {
    const city = cityInput.value;
    desc.innerText = "Loading...";
    const response1 = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const data1 = await response1.json();

    if(!data1.results) {
        desc.innerText = "City not Found";
        return;
    }

    const lat = data1.results[0].latitude;
    const lon = data1.results[0].longitude;

    const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
    const data2 = await response2.json();

    console.log(data2);

    cityName.innerText = city;
    temp.innerText = data2.current.temperature_2m + "°C";
    wind.innerText = "Wind: " + data2.current.wind_speed_10m + " km/h";
    humidity.innerText = "Humidity: " + data2.current.relative_humidity_2m + "%";

    let code = data2.current.weather_code;
    if (code === 0) {
        icon.innerText = "☀️";
    } else if (code <= 3) {
        icon.innerText = "⛅";
    } else if (code === 45 || code === 48) {
        icon.innerText = "🌫️";
    } else if (code <= 55) {
        icon.innerText = "🌦️";
    } else if (code <= 65) {
        icon.innerText = "🌧️";
    } else if (code <= 75) {
        icon.innerText = "❄️";
    } else {
        icon.innerText = "⛈️";
    }

    desc.innerText = "Today's Weather";
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        getWeather();
    }
});