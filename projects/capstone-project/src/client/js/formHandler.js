async function handleSubmit(e) {
  e.preventDefault();
  const userQuery = document.getElementById("city").value;
  const arrivalDate = document.getElementById("date").value;
  const daysToDeparture = Client.checkDate(arrivalDate);
  if (!daysToDeparture) {
    Client.setInvalidTravelDate();
    return;
  }
  const locationData = await Client.getLocationData(userQuery);
  const forecastData = await Client.getForecastData(
    locationData,
    daysToDeparture
  );
  const destinationPhoto = await Client.getPhoto(locationData);
  Client.updateTripInformation(locationData, forecastData, destinationPhoto);
}

export { handleSubmit };
