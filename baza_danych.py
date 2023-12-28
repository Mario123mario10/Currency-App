import requests
from pymongo import MongoClient


client = MongoClient("localhost", 27017)
db = client.nbp
collection_zloto = db.zloto
collection_rate = db.rate
collection_tableA = db.tableA
collection_tableB = db.tableB
collection_tableC = db.tableC


urls = {

    'tables':   'http://api.nbp.pl/api/exchangerates/tables/{table}/',
    'tables_date_start_end': "http://api.nbp.pl/api/exchangerates/tables/{table}/{startDate}/{endDate}/",
    'rates':    'http://api.nbp.pl/api/exchangerates/rates/{table}/{code}',
    'cenyzlota': 'http://api.nbp.pl/api/cenyzlota/',

}

def getCenazlota():
    r = requests.get(urls['cenyzlota']).json()
    return r#r[0]['data'], r[0]['cena']

def getRates(table, code):
    r = requests.get(urls['rates'].format(table=table, code=code)).json()
    return r#r['rates'][0]['effectiveDate'], r['rates'][0]['mid']

def getTables(table):
    r = requests.get(urls['tables'].format(table=table)).json()
    return r

def getTablesDateStartEnd(table, startDate, endDate):
    r = requests.get(urls['tables_date_start_end'].format(table=table, startDate=startDate, endDate=endDate)).json()
    return r


# a = getCenazlota()
# print(a)
# result = collection_zloto.insert_one(a[0])

# b = getRates('A', "chf")
# print(b)
# result2 = collection_rate.insert_one(b)


c = getTables('A')
print(c)
result3 = collection_tableA.insert_many(c)

d = getTables('B')
print(d)
result4 = collection_tableB.insert_many(d)

e = getTables('C')
print(e)
result5 = collection_tableC.insert_many(e)


# data, cena = getCenazlota()
# print(data, cena)

# data, cena = getRates('A', 'chf')
# print(data, cena)