import React, { useState } from "react";
import api from "../api";

const IndexPage = () => {
  const [responseData, setResponseData] = useState("");

  const fetchData = (e) => {
    e.preventDefault();
    api
      .getStockSummary()
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
        <button type="Submit">Submit</button>
      </form>
      <p>{responseData && responseData.name}</p>
      <p>{responseData && responseData.symbol}</p>
      <p>{responseData && responseData.price}</p>
      <p>{responseData && responseData.priceChange}</p>
      <p>{responseData && responseData.priceChangePercent}</p>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Yahoo Finance Site</title>;
