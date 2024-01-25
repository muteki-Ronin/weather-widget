import {
  calculateDevPoint,
  convertPressure,
  getCurrentDateTime,
  getWeatherForecastData,
} from "./utils.js";

export const renderWidgetToday = (widget, dataWeather) => {
  const { dayOfMonth, month, year, hours, minutes, dayOfWeek } =
    getCurrentDateTime();

  widget.insertAdjacentHTML(
    "beforeend",
    `
  <div class="widget__today">
      <div class="widget__date-block">
        <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
        <p class="widget__time">${hours}:${minutes}</p>
        <p class="widget__day">${dayOfWeek}</p>
      </div>

      <div class="widget__icon">
        <img class="widget__img" src="./icon/${
          dataWeather.weather[0].icon
        }.svg" alt="Погода">
      </div>

      <div class="widget__wheather">
        <div class="widget__city">
          <p>${dataWeather.name}</p>
          <button class="widget__change-city" aria-label="Изменить город"></button>
        </div>
        <p class="widget__temp-big">${(dataWeather.main.temp - 273.15).toFixed(
          1
        )}°C</p>
        <p class="widget__felt">ощущается</p>
        <p class="widget__temp-small">${(
          dataWeather.main.feels_like - 273.15
        ).toFixed(1)}°C</p>
      </div>
    </div>
  `
  );
};

export const renderWidgetOther = (widget, dataWeather) => {
  widget.insertAdjacentHTML(
    "beforeend",
    `
  <div class="widget__other">
      <div class="widget__wind">
        <p class="widget__wind-title">Ветер</p>
        <p class="widget__wind-speed">${dataWeather.wind.speed} м/с</p>
        <p class="widget__wind-text" style="transform: rotate(${
          dataWeather.wind.deg
        }deg)">&#8595</p>
      </div>

      <div class="widget__humidity">
        <p class="widget__humidity-title">Влажность</p>
        <p class="widget__humidity-value">${dataWeather.main.humidity}%</p>
        <p class="widget__humidity-text">Т.Р: ${calculateDevPoint(
          dataWeather.main.temp - 273.15,
          dataWeather.main.humidity
        )} °C</p>
      </div>

      <div class="widget__pressure">
        <p class="widget__pressure-title">Давление</p>
        <p class="widget__pressure-value">${convertPressure(
          dataWeather.main.pressure
        )}</p>
        <p class="widget__pressure-text">мм рт.ст.</p>
      </div>
    </div>
  `
  );
};

export const renderWidgetForecast = (widget, data) => {
  const widgetForecast = document.createElement("ul");
  widgetForecast.className = "widget__forecast";
  widget.append(widgetForecast);

  const forecastData = getWeatherForecastData(data);

  const items = forecastData.map((item) => {
    const widgetDayItem = document.createElement("li");

    widgetDayItem.className = "widget__day-item";
    widgetDayItem.insertAdjacentHTML(
      "beforeend",
      `
        <p class="widget__day-text">${item.dayOfWeek}</p>
        <img class="widget__day-img" src="./icon/${
          item.weatherIcon
        }.svg" alt="Погода">
        <p class="widget__day-temp">${(item.minTemp - 273.15).toFixed(1)}°/${(
        item.maxTemp - 273.15
      ).toFixed(1)}°</p>
    `
    );
    return widgetDayItem;
  });

  widgetForecast.append(...items);
};

export const showError = (widget, error) => {
  console.log(error);
  widget.textContent = error.toString();
  widget.classList.add("widget_error");
};
