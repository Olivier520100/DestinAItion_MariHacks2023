async function GetImages(location) {
  const urlstart = "http://5983-66-131-160-171.ngrok.io/"
  const apiUrl1 = urlstart+"image/"+location[0].replace(' ', '+');
  const apiUrl2 = urlstart+"image/"+location[2].replace(' ', '+');
  const apiUrl3 = urlstart+"image/"+location[4].replace(' ', '+');
  const apiUrl4 = urlstart+"image/"+location[6].replace(' ', '+');
  const apiUrl5 = urlstart+"image/"+location[8].replace(' ', '+');
  console.log(location[0])
  let pics1, pics2, pics3, pics4, pics5;
  console.log(apiUrl1)
  try {
    const response = await fetch(apiUrl1);
    const data = await response.json();
    pics1 = [data.image1,data.image2,data.image3]
    console.log(pics1)
  } catch (error) {
    console.error(`Error fetching Images: ${error.message}`);
  }
  console.log(apiUrl2)

  try {
    const response = await fetch(apiUrl2);
    const data = await response.json();
     pics2 = [data.image1,data.image2,data.image3]
    console.log(pics2)
  } catch (error) {
    console.error(`Error fetching Images: ${error.message}`);
  }
  console.log(apiUrl3)

  try {
    const response = await fetch(apiUrl3);
    const data = await response.json();
     pics3 = [data.image1,data.image2,data.image3]
    console.log(pics3)
  } catch (error) {
    console.error(`Error fetching Images: ${error.message}`);
  }
  console.log(apiUrl4)

  try {
    const response = await fetch(apiUrl4);
    const data = await response.json();
     pics4 = [data.image1,data.image2,data.image3]
    console.log(pics4)
  } catch (error) {
    console.error(`Error fetching Images: ${error.message}`);
  }
  console.log(apiUrl5)

  try {
    const response = await fetch(apiUrl5);
    const data = await response.json();
     pics5 = [data.image1,data.image2,data.image3]
    console.log(pics5)
  } catch (error) {
    console.error(`Error fetching Images: ${error.message}`);
  }
  return [pics1,pics2,pics3,pics4,pics5]
}

module.exports = { GetImages };