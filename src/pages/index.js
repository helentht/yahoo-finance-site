import React, { useState } from "react";
import api from "../api";

const IndexPage = () => {
  const [responseData, setResponseData] = useState("");
  const [symbol, setSymbol] = useState("");

  const fetchData = (e) => {
    e.preventDefault();
    api
      .getStockSummary(symbol)
      .then((response) => {
        setResponseData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <form onSubmit={fetchData}>
        <label htmlFor="symbol">Enter a stock symbol</label>
        <input
          type="text"
          name="symbol"
          id="symbol"
          value={symbol}
          placeholder="AMRN"
          autoFocus
          onChange={(e) => setSymbol(e.target.value)}
        />

        <button type="Submit">Submit</button>
      </form>
      <p>
        {responseData && responseData.name + " (" + responseData.symbol + ") "}
      </p>
      <p>{responseData && responseData.price}</p>
      <p>{responseData && responseData.priceChange}</p>
      <p>{responseData && responseData.percentChange}</p>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Yahoo Finance Site</title>;
