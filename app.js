// TODO:  DOM
document.addEventListener("DOMContentLoaded", () => {

  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");

  searchBtn.addEventListener("click", async () => {
    const cityName = cityInput.value;

    try {
      // city
      const cityResp = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const cityData = await cityResp.json();

      if (!cityData.results) {
        alert("City not found!");
        return;
      }

      const lat = cityData.results[0].latitude;
      const lon = cityData.results[0].longitude;

      // weather
      const weatherResp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`);
      const weatherData = await weatherResp.json();

      //  HTML
      document.getElementById("cityName").textContent = cityData.results[0].name;
      document.getElementById("cityTemp").textContent = `Current weather: ${weatherData.current_weather.temperature} °C`;

      document.getElementById("CountryData").textContent = cityData.results[0].country || "--";
      document.getElementById("TimezoneData").textContent = weatherData.timezone;
      document.getElementById("PopulationData").textContent = cityData.results[0].population || "--";
      document.getElementById("ForecastData").textContent = `Max: ${weatherData.daily.temperature_2m_max[0]}°C, Min: ${weatherData.daily.temperature_2m_min[0]}°C`;

      // change the photo 
      const isDay = weatherData.current_weather.is_day;
      document.getElementById("dayImg").style.display = isDay ? "block" : "none";
      document.getElementById("nightImg").style.display = isDay ? "none" : "block";

    } catch (error) {
      alert("Error fetching data");
      console.error(error);
    }
  });

});
