function handleSubmit(e) {
  e.preventDefault();
  const userQuery = document.getElementById("city").value;
  const arrivalDate = document.getElementById("date").value;
  if (checkDate(arrivalDate)) {
    getLocationData(userQuery);
  } else
    document.getElementById(
      "results__countdown"
    ).innerHTML = `<p class="warning">Invalid arrival date input. Please enter a date in the future.</p>`;
  document.getElementById("results__destination").innerHTML = ``;
}

const checkDate = (arrivalDate) => {
  const now = new Date();
  const arrivalDateEpoch = new Date(arrivalDate);
  if (!arrivalDate || arrivalDateEpoch < now) {
    return false;
  } else {
    calculateTravelTime({ now, arrivalDateEpoch });
    return true;
  }
};

function calculateTravelTime({ now, arrivalDateEpoch }) {
  const millisecondsToArrival = arrivalDateEpoch - now;
  // convert milliseconds to number of days, rounding up to the nearest full day
  const daysToArrival = Math.ceil(millisecondsToArrival / 1000 / 60 / 60 / 24);
  document.getElementById(
    "results__countdown"
  ).innerHTML = `Days until trip: ${daysToArrival}.`;
}

function getLocationData(userQuery) {
  fetch("http://localhost:8081/userData", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: userQuery }),
  })
    .then((res) => res.json())
    .then(function (res) {
      const pageElement = document.getElementById("results__destination");
      Client.updatePageContents(pageElement, res);
      getForecastData();
      getPhoto();
    });
}

async function getForecastData() {
  fetch("http://localhost:8081/travelForecast", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
      document.getElementById(
        "results__forecast"
      ).innerHTML = `Weather: High of ${res.data[0].high_temp}&deg;F, low of ${res.data[0].low_temp}&deg;F.`;
    });
}

async function getPhoto() {
  fetch("http://localhost:8081/destinationImage", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
      document.getElementById(
        "results__photo"
      ).innerHTML = `<img src=\"${res.hits[0].largeImageURL}\" alt=\"Photograph of Paris by Pixabay user ${res.hits[0].user}\" />`;
    });
}

export { getForecastData };
export { handleSubmit };
export { getLocationData };
