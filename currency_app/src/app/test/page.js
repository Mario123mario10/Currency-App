'use client';
import React, {useState, useEffect} from "react";
import CONSTANTS from "../properties"

export default function Test() {

    const [price, setPrice] = useState("");
    const [currencies, setCurrencies] = useState([]);
    const [main_currency, setMainCurrency] = useState("PLN");
    const [main_currency_price, setMainCurrencyPrice] = useState("0.00");
    const [transfer_currency, setTransferCurrency] = useState("USD");
    const [transfer_currency_price, setTransferCurrencyPrice] = useState("0.00");

    //wykonuje funkcję tylko raz przy załadowaniu strony
    useEffect(() => {
        requestCurrencies();
      }, []);

    //wykonuje za każdym razem jak zmieni się wartość zmiennej main_currency
    useEffect(() => {
        if (main_currency !== "PLN"){
            fetch(CONSTANTS.domain + "/currency/" + main_currency.toLowerCase())
            .then(response => response.json())
            .then(data => setMainCurrencyPrice(data.rates[0].mid))
        }
        else{
            setMainCurrencyPrice("1.00")
        }
      }, [main_currency]);

    //wykonuje za każdym razem jak zmieni się wartość zmiennej transfer_currency
    useEffect(() => {
        fetch(CONSTANTS.domain + "/currency/" + transfer_currency.toLowerCase())
        .then(response => response.json())
        .then(data => setTransferCurrencyPrice(data.rates[0].mid))
    }, [transfer_currency]);


    const requestPrice = (currency_name) => {
        return fetch(CONSTANTS.domain + "/currency/" + currency_name.toLowerCase())
        .then(response => response.json())
        .then(data => {return data.rates[0].mid})
        .catch(error => {
            console.error('Błąd podczas pobierania danych:', error)
        });
    }
    const requestSinglePrice = async () => {
        let first_price = await requestPrice(main_currency)
            .then(result => {
                return result
            })
        let second_price = await requestPrice(transfer_currency)
            .then(result => {
                return result
            })
        setPrice(Number(first_price)/Number(second_price));
    }

    const requestCurrencies = () => {
        let request = new Request(CONSTANTS.domain + "/currencies_json")
        try{
            fetch(request)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setCurrencies(data)
                })
        } catch(e) {

        }
    }

    const handleMainCurrencyChange = (event) => {
        setMainCurrency(event.target.value);
      };

    const handleTransferCurrencyChange = (event) => {
        setTransferCurrency(event.target.value);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <button
            onClick={requestSinglePrice}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sprawdź
            </button>
            <select
            id="main_currency"
            value={main_currency}
            onChange={handleMainCurrencyChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                    {currency.code}
                </option>
                ))}
            </select>
            <select id="currency_to_transfer"
            value={transfer_currency}
            onChange={handleTransferCurrencyChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                    {currency.code}
                </option>
                ))}
            </select>
        </div>
        <h1>1 {main_currency} do {transfer_currency} wynosi {price}</h1>
        <h1>Pierwsza waluta {main_currency} kurs w stosunku do PLN- {main_currency_price} </h1>
        <h1>Druga waluta {transfer_currency} kurs w stosunku do PLN- {transfer_currency_price}</h1>
      </main>
            )
        }