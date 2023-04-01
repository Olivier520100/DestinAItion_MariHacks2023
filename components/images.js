async function GetImages(location) {
  const apiUrl = "https://serpapi.com/search.json?q=Nice+Pictures+london&tbm=isch&ijn=0&app_key=416251398a40fc2db23e0cc2c921ae71bc409a0887fdb015e5a24e372bd1ae59%22";
  console.log(apiUrl)
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pic1 = data.images_results[0].original;
    const pic2 = data.images_results[1].original;

    console.log(pic1);
    console.log(pic2);
    return [pic1, pic2]

  } catch (error) {
    console.error(`Error fetching Images: ${error.message}`);
  }
}

module.exports = { GetImages };