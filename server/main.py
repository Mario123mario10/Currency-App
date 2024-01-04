from flask import Flask
from flask_pymongo import PyMongo
import requests

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

@app.route("/")
def hello_world():
    mongo.db.tescik.insert_one({"testowa_wartosc":3})
    a = mongo.db.tescik.find({})
    print(a[1]["testowa_wartosc"])
    return f"<p>Hello, World! tescik:</p>"

@app.route("/waluta")
def test_usd():
    header = {'Accept': 'application/json'}
    url="http://api.nbp.pl/api/exchangerates/rates/a/usd/"
    todays_usd = requests.get(url, headers=header).content
    return todays_usd

app.run(debug=True)