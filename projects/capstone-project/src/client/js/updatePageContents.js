function updateTripInformation(locationData, forecastData, destinationPhoto) {
  const firstResult = locationData.geonames[0];
  const city = firstResult.name;
  // locality was good for US destinations, because it adds states, but is weird for other countries, e.g. Moscow, Moscow, Russia.
  // const locality = firstResult.adminName1;
  const country = firstResult.countryName;
  const maxTemp = forecastData.data[0].high_temp;
  const minTemp = forecastData.data[0].low_temp;
  const photoURL = destinationPhoto.largeImageURL;
  const photoCredit = destinationPhoto.user;
  const photoLinkBack = destinationPhoto.pageURL;
  document.getElementById("form-result__heading").style.display = "block";
  document.getElementById(
    "results__destination"
  ).innerHTML = `Traveling to ${city}, ${country}.`;
  document.getElementById(
    "results__forecast"
  ).innerHTML = `Weather: High of ${maxTemp}&deg;F, low of ${minTemp}&deg;F.`;
  document.getElementById(
    "results__photo"
  ).innerHTML = `<img src=\"${photoURL}\" alt=\"Photograph of Paris by Pixabay user ${photoCredit}\" /><br><a class=\"results__photo__credit\" href=\"${photoLinkBack}\">Photo by ${photoCredit} via Pixabay.</a>`;
}

function setInvalidTravelDate() {
  document.getElementById(
    "results__countdown"
  ).innerHTML = `<p class="warning">Invalid arrival date input. Please enter a date in the future.</p>`;
  document.getElementById("results__destination").innerHTML = ``;
  document.getElementById("results__forecast").innerHTML = ``;
  document.getElementById("results__photo").innerHTML = ``;
}

function updateCountdown(daysToArrival) {
  document.getElementById(
    "results__countdown"
  ).innerHTML = `Days until trip: ${daysToArrival}.`;
}

export { updateTripInformation, updateCountdown, setInvalidTravelDate };
