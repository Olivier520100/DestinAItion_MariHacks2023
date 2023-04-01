from pymongo import MongoClient
import json

f = open('keys.json')
keys = json.load(f)



def add_data(jsonData):
    client = MongoClient(keys["mongoURI"])
    db = client["attractions"]
    collection = db["city"]
    collection.insert_one(jsonData)


def get_data(userInput):
    client = MongoClient(keys["mongoURI"])
    db = client["attractions"]
    collection = db["city"]
    for x in collection.find({"city": userInput}):
        del x['_id']
        return (x)


def exists(userInput):
    client = MongoClient(keys["mongoURI"])
    db = client["attractions"]
    collection = db["city"]

    for x in collection.find({"city": userInput}):
        return True
    return False
