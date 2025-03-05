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
      .then(
        ({
          sys: { sunrise, sunset },
          name,
          main: { temp },
          wind: { speed },
          weather: [{ icon, description }]
        }) => {

          // 1. отобразить информацию о погоде (имя города, погода, описание погоды и скорость ветра)

          // Получение полной информации о дате и времени
          const sunriseDate = new Date(sunrise * 1000);
          const sunsetDate = new Date(sunset * 1000);

          // Получение времени восхода
          const sunriseHours = "0" + sunriseDate.getHours();
          const sunriseMinutes =
            sunriseDate.getMinutes() < 10
              ? "0" + sunriseDate.getMinutes()
              : sunriseDate.getMinutes();
          const sunriseSeconds =
            sunriseDate.getSeconds() < 10
              ? "0" + sunriseDate.getSeconds()
              : sunriseDate.getSeconds();

          // Получение времени заката
          const sunsetHours = sunsetDate.getHours();
          const sunsetMinutes =
            sunsetDate.getMinutes() < 10
              ? "0" + sunsetDate.getMinutes()
              : sunsetDate.getMinutes();
          const sunsetSeconds =
            sunsetDate.getSeconds() < 10
              ? "0" + sunsetDate.getSeconds()
              : sunsetDate.getSeconds();

          // https://openweathermap.org/img/wn/10d@2x.png

          weatherContainer.innerHTML = `
                    <div>
                        <h2>${name}</h2>
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather" />
                    </div>
                    <p>Temperature: ${temp.toFixed(1)} °C</p>
                    <p>Description of weather: ${description}</p>
                    <p>Speed of wind: ${speed} m/s</p>
                    <p>Sunrise: ${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}</p>
                    <p>Sunset: ${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}</p>
                `;
        }
      )
      .catch((error) => {
        weatherContainer.textContent = error;
      });
  }
};

// Массив, в котором заранее известны кол-во элементов и суть элементов, которые находятся в массиве называется кортеж

// const arr = [1, 2, 3];
// const [first, second, third] = arr;