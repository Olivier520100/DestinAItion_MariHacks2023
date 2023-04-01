async function GetCoordinates(location) {
  const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=$" + location + "&key=AIzaSyBGwo4KfC880qldYVqzMODQAIEmHt0pMeo";
  console.log(apiUrl)
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const coordString1 = data.results[0].geometry.location.lat;
    const coordString2 = data.results[0].geometry.location.lng;

    console.log(coordString1);
    console.log(coordString2);
    return [coordString1, coordString2]

  } catch (error) {
    console.error(`Error fetching coordinates: ${error.message}`);
  }
}

module.exports = { GetCoordinates };