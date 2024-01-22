'use client';
import React, {useState, useEffect} from "react";
import { Chart } from "chart.js";
import CONSTANTS from "../properties"
import { render } from "react-dom";

export default function Test() {

    const [price, setPrice] = useState("");
    const [currencies, setCurrencies] = useState([]);
    const [main_currency, setMainCurrency] = useState("PLN");
    const [main_currency_price, setMainCurrencyPrice] = useState("0.00");
    const [transfer_currency, setTransferCurrency] = useState("USD");
    const [transfer_currency_price, setTransferCurrencyPrice] = useState("0.00");

    const [start_date, setStartDate] = useState("2023-10-01");
    const [end_date, setEndDate] = useState("2024-01-01");
    const [chart_data, setChartData] = useState({labels: [], data: []});

    //wykonuje funkcję tylko raz przy załadowaniu strony
    useEffect(() => {
        requestCurrencies();
      }, []);

    //wykonuje za każdym razem jak zmieni się wartość zmiennej main_currency
    // useEffect(() => {
    //     if (start_date && end_date && transfer_currency){
    //         fetchCurrencyData(start_date, end_date, transfer_currency)
    //     }

    //   }, [start_date, end_date, transfer_currency]);

    // const fetchCurrencyData = async (start_date, end_date, transfer_currency) => {
    //   try {
    //     const response = await fetch(CONSTANTS.domain + "/currency/" + transfer_currency.toLowerCase() + "/" + start_date + "/" + end_date)
    //   }
    // }

    useEffect(() => {
      if (start_date && end_date && transfer_currency){

        fetch(CONSTANTS.domain + "/currency/" + transfer_currency.toLowerCase() + "/" + start_date + "/" + end_date)

        .then(response => response.json())
        .then(data => {

          const labels = data.map(item => item.effectiveDate);
          const values = data.map(item => Number(item.mid));
          setChartData({labels, data: values})

        })
      }
    },  [start_date, end_date, transfer_currency]);

    // useEffect(() => {
    //   if (chart_data.labels.length && chart_data.data.length){
    //     render_chart(chart_data);
    //   }

    // }, [chart_data]);

    //wykonuje za każdym razem jak zmieni się wartość zmiennej transfer_currency
    useEffect(() => {
        fetch(CONSTANTS.domain + "/currency/" + transfer_currency.toLowerCase())
        .then(response => response.json())
        .then(data => setTransferCurrencyPrice(data.rates[0].mid))
    }, [transfer_currency]);


    // const render_chart = (chart_data) => {
    //   var ctx = document.getElementById('myChart').getContext('2d');
    //     var myChart = new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: chart_data.labels,
    //             datasets: [{
    //                 data: [chart_data.data],
    //                 label: "Cena w PLN",
    //                 borderColor: "rgb(109, 253, 181)",
    //                 backgroundColor: "rgb(109, 253, 181,0.5)",
    //                 borderWidth: 2
    //             }
    //             ]
    //         },
    //     });
    // }


    //tworzy wykres
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chart_data.labels,
                datasets: [{
                    data: chart_data.data,
                    label: "Cena w PLN",
                    borderColor: "rgb(109, 253, 181)",
                    backgroundColor: "rgb(109, 253, 181,0.5)",
                    borderWidth: 2,
                    pointRadius: 3

                }
                ]
            },
        });
        //alert(chart_data.data)
        return () => {myChart.destroy();};
    },[chart_data]);

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
        </div>
        <div>
          <input type = "date" value = {start_date} onChange={(e) => setStartDate(e.target.value)}/>
          <input type = "date" value = {end_date} onChange={(e) => setEndDate(e.target.value)}/>
        </div>
        <h1 className="w-[250px] mx-auto mt-10 text-xl font-semibold capitalize ">{transfer_currency}</h1>
            <div className="w-[1100px] h-screen flex mx-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
      </main>
            )
        }