function updateTripInformation(locationData, forecastData, destinationPhoto) {
  console.log(forecastData);
  const firstResult = locationData.geonames[0];
  const city = firstResult.name;
  const locality = firstResult.adminName1;
  const country = firstResult.countryName;
  // locality adds the state for US destinations, but is weird for other countries, e.g. Moscow, Moscow, Russia.
  const showLocality = country === "United States";
  const maxTemp = forecastData.data[0].high_temp;
  const minTemp = forecastData.data[0].low_temp;
  const photoURL = destinationPhoto.largeImageURL;
  const photoCredit = destinationPhoto.user;
  const photoLinkBack = destinationPhoto.pageURL;
  document.getElementById("form-result__heading").style.display = "block";
  document.getElementById(
    "results__destination"
  ).innerHTML = `Traveling to ${city}, ${
    showLocality ? `${locality}, ` : ""
  }${country}.`;
  document.getElementById(
    "results__forecast"
  ).innerHTML = `Weather: High of ${maxTemp}&deg;F, low of ${minTemp}&deg;F.`;
  // alt="" for photo because there's no title being sent back from the call, and I can't guarantee that it will be a photo of the place the user wants. Bad for accessibility, so I'm just hiding the entire photo from screen readers instead.
  document.getElementById(
    "results__photo"
  ).innerHTML = `<img src=\"${photoURL}\" alt=\"\" />`;
  document.getElementById(
    "results__photo__caption"
  ).innerHTML = `<a class=\"results__photo__credit\" href=\"${photoLinkBack}\" target=\"blank\">Photo by ${photoCredit} via Pixabay.</a>`;
}

function setInvalidTravelDate() {
  document.getElementById(
    "results__countdown"
  ).innerHTML = `<p class="warning">Invalid arrival date input. Please enter a date in the future.</p>`;
  document.getElementById("results__destination").innerHTML = ``;
  document.getElementById("results__forecast").innerHTML = ``;
  document.getElementById("results__photo").innerHTML = ``;
}

// passing in pageElement manually so that testing works
function updateCountdown({
  daysToArrival,
  pageElement = document.getElementById("results__countdown"),
}) {
  pageElement.innerHTML = `<strong>${daysToArrival}</strong> days until the trip!`;
}

export { updateTripInformation, updateCountdown, setInvalidTravelDate };
