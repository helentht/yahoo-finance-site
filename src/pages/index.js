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
      <p>{responseData ? responseData.price.longName : ""}</p>
      <p>{responseData ? responseData.price.symbol : ""}</p>
      <p>{responseData ? responseData.price.regularMarketPrice.fmt : ""}</p>
      <p>{responseData ? responseData.price.regularMarketChange.fmt : ""}</p>
      <p>
        {responseData ? responseData.price.regularMarketChangePercent.fmt : ""}
      </p>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Yahoo Finance Site</title>;
