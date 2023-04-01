from flask import Flask, jsonify
import App
from google_images_search import GoogleImagesSearch
import json
import requests

f = open('keys.json')
keys = json.load(f)

app = Flask(__name__)


@app.route('/api/<city>')
def get_weather(city):
    data = App.cityGuide(city)
    return jsonify(data)


@app.route('/wolfram/<input>')
def get_wolfram(city):
    url = f"http://api.wolframalpha.com/v1/spoken?appid=%22+key+%22&i=%22{input}%22+airport+iata+code%3f"

    response = requests.get(url)
    if response.status_code == 200:
        # Success! Extract the data from the response
        data = response.json()
        return json.dumps(data)
    else:
        # Something went wrong, handle the error
        print("Error: ", response.status_code)
        return 0


@app.route('/flights/<fromWhere>/<toWhere>')
def get_flights(fromWhere, toWhere):
    url = f"https://www.cheapflights.ca/a/api/flightPricePrediction/coloredCalendar/oneWay?origin={fromWhere}&destination={toWhere}&dateMode=single&distinct=false"
    response = requests.get(url)
    if response.status_code == 200:
        # Success! Extract the data from the response
        data = response.json()
        return json.dumps(data)
    else:
        # Something went wrong, handle the error
        print("Error: ", response.status_code)
        return 0


@app.route('/image/<city>')
def get_image(city):
    def get_image_urls(prompt):
        # set up the Google Images Search API client
        gis = GoogleImagesSearch(keys["googleKey"], keys["cxKey"])

        # define the search query
        search_params = {
            'q': prompt,
            'num': 3,  # return only the first three images
            'imgSize': 'large',  # search for large images
            'imgType': 'photo',  # search for only photos
            'imgColorType': 'color',  # search for only color images
            'safe': 'high',  # search for only safe images
        }

        # perform the search and get the URLs of the first three images
        gis.search(search_params=search_params)
        urls = [result.url for result in gis.results()[:3]]

        # return the URLs
        return urls

    urls = get_image_urls(city)
    url_dict = {'image1': urls[0], 'image2': urls[1], 'image3': urls[2]}
    # Output the dictionary in JSON format
    return json.dumps(url_dict, indent=4)


if __name__ == '__main__':
    app.run(debug=True)
