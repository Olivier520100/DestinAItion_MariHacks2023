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
    print(url_dict)
    return json.dumps(url_dict, indent=4)


if __name__ == '__main__':
    app.run(debug=True)
