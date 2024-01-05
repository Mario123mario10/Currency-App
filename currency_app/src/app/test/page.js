'use client';
import React, {useState} from "react";
import CONSTANTS from "../../../properties"

export default function Test() {

    const [price, setPrice] = useState("");

    const requestUSD = () => {
        let request = new Request(CONSTANTS.domain + "/waluta")
        try{
            fetch(request)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setPrice(data.rates[0].mid)
                    console.log(price)
                    return
                })
        } catch(e) {

        }
    }

    const callAPI = async () => {
		try {
			const res = await fetch(
				CONSTANTS.domain + "/waluta"
			);
			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

    return (
        <div>
            <button type="button" onClick={requestUSD}>Current USD price</button>
            <div>{price}</div>
        </div>
            )
        }