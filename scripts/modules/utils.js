const addZero = (n) => (n < 10 ? `0${n}` : n);

export const getCurrentDateTime = () => {
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  const weekdays = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ];

  const date = new Date();
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = weekdays[date.getDay()];
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return { dayOfMonth, month, year, dayOfWeek, hours, minutes };
};

export const getWindDirection = (deg) => {
  const directions = [
    "&#8593;",
    "&#8598;",
    "&#8592;",
    "&#8601;",
    "&#8595;",
    "&#8600;",
    "&#8594;",
    "&#8599;",
  ];

  const i = Math.round(deg / 45) % 8;

  return directions[i];
};

export const calculateDevPoint = (temp, hum) => {
  const a = 17.27;
  const b = 237.7;

  const ft = (a * temp) / (b + temp) + Math.log(hum / 100);
  const devPoint = (b * ft) / (a - ft);

  return devPoint.toFixed(1);
};

export const convertPressure = (pressure) => {
  const mmHg = pressure * (1 / 1.33);

  return mmHg.toFixed(2);
};
