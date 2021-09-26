function updatePageContents(pageElement, content) {
  const firstResult = content.geonames[0];
  console.log(firstResult);
  const city = firstResult.name;
  const locality = firstResult.adminName1;
  const country = firstResult.countryName;
  const latitude = firstResult.lat;
  const longitude = firstResult.lng;
  pageElement.innerHTML = `Traveling to ${city}, ${locality}, ${country}. Latitude: ${latitude}. Longitude: ${longitude}.`;
}

export { updatePageContents };
