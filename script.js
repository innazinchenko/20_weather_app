const API_KEY = "d4947cc5c09edbcc45f41b87459edfc2";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const locationInput = document.getElementById("locationInput");
const weatherBtn = document.getElementById("weatherBtn");
const weatherContainer = document.getElementById("weatherContainer");

weatherBtn.onclick = () => {
  const cityName = locationInput.value.trim();

  if (cityName) {
    fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        if (response.status) {
          return response.json();
        } else
          throw new Error(
            "Проверьте правильность написания населённого пункта. Если всё верно, попробуйте найти погоду в ближайшем более крупном населённом пункте"
          );
      })
      .then((weatherInfo) => {
        // 1. отобразить информацию о погоде (имя города, погода, описание погоды и скорость ветра)
        weatherContainer.innerHTML = `
                    <h2>Name: ${weatherInfo.name}</h2>
                    <p>Temperature: ${weatherInfo.main.temp} °C</p>
                    <p>Description of weather: ${weatherInfo.weather[0].description}</p>
                    <p>Speed of wind: ${weatherInfo.wind.speed} m/s</p>
                    <p>Feels like: ${weatherInfo.main.feels_like}  °C</p>
                `;
      })
      .catch((error) => {
        weatherContainer.textContent = error;
      });
  }
};
