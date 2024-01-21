from flask import Blueprint
from flask_cors import cross_origin
from .db import get_db

db_data= Blueprint('db_data', __name__)

@db_data.route("/currency_db/<currency>")
@cross_origin()
def get_currency_db(currency):
    database = get_db()
    kurs_sredni = database['kursy_srednie']
    dane = kurs_sredni.find({"code": currency})
    print(dane)
    for i in dane:
        print(i)
        value = i["mid"]
        name = i["currency"]
        code = i["code"]

    return f'Nazwa waluty: {name} Skrót: {code} Średnia wartość:{value}'

# @db_data.route("/currencies_json_db")
# @cross_origin()
# def currencies_json_db():
#     client = get_db()
#     database = client['nbp']
#     tableA = database['tableA']
#     aa = tableA.find({"code": "USD"})
#     for i in aa:
#         print(i)
#     return str(i)