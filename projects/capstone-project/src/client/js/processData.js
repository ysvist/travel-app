const checkDate = (arrivalDate) => {
  const now = new Date();
  const arrivalDateEpoch = new Date(arrivalDate);
  if (!arrivalDate || arrivalDateEpoch < now) {
    return false;
  } else {
    return calculateTravelTime({ now, arrivalDateEpoch });
  }
};

function calculateTravelTime({ now, arrivalDateEpoch }) {
  const millisecondsToArrival = arrivalDateEpoch - now;
  // convert milliseconds to number of days, rounding up to the nearest full day
  const daysToArrival = Math.ceil(millisecondsToArrival / 1000 / 60 / 60 / 24);
  Client.updateCountdown(daysToArrival);
  return daysToArrival;
}

async function getLocationData(userQuery) {
  const response = await fetch("http://localhost:8081/userData", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: userQuery }),
  });
  const responseJSON = await response.json();
  return responseJSON;
}

async function getForecastData(locationData, daysToDeparture) {
  const response = await fetch("http://localhost:8081/travelForecast", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location: locationData, days: daysToDeparture }),
  });
  const responseJSON = await response.json();
  return responseJSON;
}

async function getPhoto(locationData) {
  const response = await fetch("http://localhost:8081/destinationImage", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: locationData }),
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export { checkDate, getForecastData, getLocationData, getPhoto };
