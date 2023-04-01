const { GetImages } = require("./images");

async function GetDest(city) {
  const urlstart1 = "http://bc97-66-131-160-171.ngrok.io/";
  const apiUrl = urlstart1 + "api/"+city;
  console.log(apiUrl)
  try {
    const response = await fetch(apiUrl);
    console.log(response)
    const data = await response.json();
    const locations = [data.destination1.name, data.destination1.description,data.destination2.name, data.destination2.description,data.destination3.name, data.destination3.description, data.destination4.name, data.destination4.description, data.destination5.name, data.destination5.description]
    console.log(locations)
    return [locations]
  } catch (error) {
    console.error(`Error fetching GPT: ${error.message}`);
  }
}

module.exports = { GetDest };