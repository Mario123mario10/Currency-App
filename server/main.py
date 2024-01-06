from flask import Flask
from flask_pymongo import PyMongo
import requests
from flask_cors import cross_origin
import ast

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

@app.route("/")
def hello_world():
    mongo.db.tescik.insert_one({"testowa_wartosc":3})
    a = mongo.db.tescik.find({})
    print(a[1]["testowa_wartosc"])
    return f"<p>Hello, World! tescik:</p>"

@app.route("/currency/<currency>")
@cross_origin()
def get_currency(currency):
    header = {'Accept': 'application/json'}
    url=f"http://api.nbp.pl/api/exchangerates/rates/a/{currency}/"
    response = requests.get(url, headers=header).content.decode('UTF-8')
    todays_usd = ast.literal_eval(response)
    return todays_usd

@app.route("/currencies_names")
@cross_origin()
def get_currencies_names():
    return

@app.route("/currencies_json")
@cross_origin()
def currencies_json():
    header = {'Accept': 'application/json'}
    url="http://api.nbp.pl/api/exchangerates/tables/a"
    currencies_json = requests.get(url, headers=header).content.decode('UTF-8')
    try:
        rates = ast.literal_eval(currencies_json)[0]['rates']
    except:
        rates = "Brak danych"
    return rates

app.run(debug=True)