'use client';
import React, {useState} from "react";

export default function Test() {

const [price, setPrice] = useState("");

const requestUSD = () => {
  let request = new Request("http://127.0.0.1:5000/waluta")
  try{
      fetch(request)
          .then(response => {
              console.log(response.json())
              return response.json()
          })
          .then(data => {
            setPrice(data.rates[0].mid)
              return
          })
  } catch(e) {

  }
}

    return (
    <div>
        <button type="button" onClick={requestUSD}>Current USD price</button>
        <div>{price}</div>
    </div>
        )
    }