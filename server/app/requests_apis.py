from flask import Blueprint
import requests
from flask_cors import cross_origin
import ast

requests_apis = Blueprint('requests_apis', __name__)

@requests_apis.route("/currency/<currency>")
@cross_origin()
def get_currency(currency):
    header = {'Accept': 'application/json'}
    url=f"http://api.nbp.pl/api/exchangerates/rates/a/{currency}/"
    response = requests.get(url, headers=header).content.decode('UTF-8')
    currency_price = ast.literal_eval(response)
    return currency_price


@requests_apis.route("/currencies_names")
@cross_origin()
def get_currencies_names():
    return

@requests_apis.route("/currencies_json")
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